import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiError, browserTimezone, fetchBreakdown, fetchStatus, type Stage } from "@/lib/breakdown/api";

const ACTIVE: Stage[] = ["importing", "labeling"];

function retryUnlessUnauthorized(count: number, err: unknown): boolean {
  if (err instanceof ApiError && (err.status === 401 || err.status === 404)) return false;
  return count < 2;
}

/**
 * Status (cheap, every 6 s while the import runs) and the breakdown (cached
 * server-side, every 45 s while it runs, once more when it completes).
 */
export function useBreakdownData(token: string | null) {
  const timezone = browserTimezone();

  const status = useQuery({
    queryKey: ["breakdown-status", token],
    queryFn: () => fetchStatus(token as string),
    enabled: !!token,
    refetchInterval: (query) => {
      const stage = query.state.data?.stage;
      // Back from the ChatGPT sign-in the connection can take a few seconds
      // to show up: keep looking, slowly, while nothing is connected.
      if (stage === "no_connection") return 10_000;
      return stage && ACTIVE.includes(stage) ? 6000 : false;
    },
    retry: retryUnlessUnauthorized,
  });

  const stage = status.data?.stage;
  const breakdown = useQuery({
    queryKey: ["breakdown-data", token, timezone, stage === "complete" ? "final" : "live"],
    queryFn: () => fetchBreakdown(token as string, timezone),
    enabled: !!token && !!stage && stage !== "no_connection",
    refetchInterval: (query) => {
      const s = query.state.data?.status.stage;
      return s && ACTIVE.includes(s) ? 45_000 : false;
    },
    staleTime: 30_000,
    placeholderData: keepPreviousData,
    retry: retryUnlessUnauthorized,
  });

  const unauthorized = [status.error, breakdown.error].some((e) => e instanceof ApiError && e.status === 401);
  return { status, breakdown, unauthorized, timezone };
}
