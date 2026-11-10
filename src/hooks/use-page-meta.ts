import { useEffect } from "react";

/** Title, description and robots meta for a page; restored when it unmounts. */
export function usePageMeta(opts: { title: string; description?: string; noindex?: boolean }) {
  const { title, description, noindex } = opts;
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const prevRobots = robots?.getAttribute("content") ?? null;
    if (noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, nofollow");
    }

    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = desc?.getAttribute("content") ?? null;
    if (description && desc) desc.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (robots) {
        if (prevRobots !== null) robots.setAttribute("content", prevRobots);
        else robots.remove();
      }
      if (desc && prevDesc !== null) desc.setAttribute("content", prevDesc);
    };
  }, [title, description, noindex]);
}
