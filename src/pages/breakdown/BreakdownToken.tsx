import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isTokenShaped, saveToken } from "@/lib/breakdown/api";

/** The emailed link: remembers the token on this device, then shows the breakdown at a clean URL. */
export default function BreakdownToken() {
  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isTokenShaped(token)) {
      navigate("/breakdown", { replace: true });
      return;
    }
    saveToken(token);
    navigate("/breakdown/me", { replace: true, state: { token } });
  }, [token, navigate]);
  return <div style={{ minHeight: "100vh", background: "var(--bg)" }} />;
}
