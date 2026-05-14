/**
 * Same proxy as repo-root `api/[...slug].js`. Required when Vercel
 * "Root Directory" is `vue-project` (only that folder is deployed).
 * Keep logic in sync with the root copy.
 *
 * Vercel → Environment Variables:
 *   CHIRRUP_API_URL = https://your-api.onrender.com  (no trailing slash)
 *
 * Path: Vercel often omits `req.query.slug` for this catch-all; derive the upstream
 * path from `req.url` (strip `/api`) or every request would hit Render `/` (health JSON).
 */
function upstreamPathname(req) {
  const slug = req.query && req.query.slug;
  if (slug) {
    if (Array.isArray(slug)) return "/" + slug.join("/");
    return "/" + slug;
  }
  let path = "/";
  try {
    path = new URL(req.url, "https://placeholder.local").pathname;
  } catch (_) {
    path = ((req.url || "/").split("?")[0] || "/").trim() || "/";
  }
  if (path.startsWith("/api/")) {
    const rest = path.slice(5).replace(/^\/+/, "");
    return rest ? `/${rest}` : "/";
  }
  if (path === "/api") return "/";
  return path || "/";
}

function bufferRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

module.exports = async (req, res) => {
  const base = (process.env.CHIRRUP_API_URL || "").replace(/\/$/, "");
  if (!base) {
    res.setHeader("Content-Type", "application/json");
    return res
      .status(503)
      .send(
        JSON.stringify({
          error:
            "Server misconfiguration: in Vercel set environment variable CHIRRUP_API_URL to your backend base URL (e.g. https://your-app.onrender.com), then redeploy.",
        })
      );
  }

  const pathname = upstreamPathname(req);
  let search = "";
  try {
    const u = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    search = u.search || "";
  } catch (_) {
    const q = req.url && req.url.indexOf("?");
    if (q >= 0) search = req.url.slice(q);
  }

  const pathSuffix = pathname === "/" ? "/" : pathname;
  const targetUrl = `${base}${pathSuffix}${search}`;

  const hopByHop = new Set([
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
    "host",
  ]);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (!value || hopByHop.has(key.toLowerCase())) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else {
      headers.set(key, value);
    }
  }

  let body;
  if (!["GET", "HEAD"].includes(req.method)) {
    body = await bufferRequestBody(req);
    if (body.length === 0) body = undefined;
  }

  let upstream;
  try {
    upstream = await fetch(targetUrl, { method: req.method, headers, body });
  } catch (_) {
    res.setHeader("Content-Type", "application/json");
    return res.status(502).send(
      JSON.stringify({
        error:
          "Upstream request failed. Check CHIRRUP_API_URL and that the backend is running.",
      })
    );
  }

  const buf = Buffer.from(await upstream.arrayBuffer());
  // fetch() decompresses gzip; upstream Content-Length / Content-Encoding refer to the
  // wire response — forwarding them with a plain buffer breaks JSON.parse in the browser.
  const omitFromForwardedResponse = new Set([
    ...hopByHop,
    "content-encoding",
    "content-length",
  ]);
  upstream.headers.forEach((value, key) => {
    if (!omitFromForwardedResponse.has(key.toLowerCase())) {
      res.setHeader(key, value);
    }
  });
  res.status(upstream.status).send(buf);
};
