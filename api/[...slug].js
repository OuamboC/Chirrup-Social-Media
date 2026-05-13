/**
 * Vercel serverless proxy: browser calls same-origin /api/... so the backend
 * is not subject to browser CORS when the origin API omits CORS on errors.
 *
 * Vercel → Settings → Environment Variables:
 *   CHIRRUP_API_URL = https://your-api.onrender.com  (no trailing slash)
 */

function pathFromQuery(query) {
  const slug = query.slug;
  if (!slug) return "/";
  if (Array.isArray(slug)) return "/" + slug.join("/");
  return "/" + slug;
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

  const pathname = pathFromQuery(req.query);
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
  upstream.headers.forEach((value, key) => {
    if (!hopByHop.has(key.toLowerCase())) {
      res.setHeader(key, value);
    }
  });
  res.status(upstream.status).send(buf);
};
