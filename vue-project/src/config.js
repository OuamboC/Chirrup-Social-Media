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
    return "Could not reach the API. If you are on the live site, set CHIRRUP_API_URL on Vercel to your backend URL, then redeploy.";
  }
  return typeof err === "string" ? err : err?.message || "Something went wrong";
}
