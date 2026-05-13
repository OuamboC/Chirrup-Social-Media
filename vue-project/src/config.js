/**
 * API base URL resolution:
 * - VITE_API_BASE_URL: explicit backend (any environment)
 * - Dev: direct to local Express (CORS is open on the server)
 * - Production (Vercel): same-origin /api → serverless proxy (see /api/[[...slug]].js)
 */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const explicit = import.meta.env.VITE_API_BASE_URL?.trim();
  if (explicit) {
    return `${explicit.replace(/\/$/, "")}${p}`;
  }
  if (import.meta.env.DEV) {
    return `http://localhost:3333${p}`;
  }
  return `/api${p}`;
}

/** User-visible message when fetch fails (network, CORS, DNS, etc.) */
export function networkErrorMessage(err) {
  if (err && typeof err === "object" && err.name === "TypeError") {
    return (
      "Network error: the browser could not complete the request to /api. " +
      "Open your Render API in a new tab to wake it (free tier sleeps), then refresh. " +
      "If it persists: Vercel → Production env CHIRRUP_API_URL must match your Render base URL, then redeploy; " +
      "in DevTools → Network inspect /api/feed."
    );
  }
  return typeof err === "string" ? err : err?.message || "Something went wrong";
}
