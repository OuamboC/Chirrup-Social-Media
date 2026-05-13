/**
 * sqlite3 ships prebuilt binaries that may target a newer glibc than the host
 * (e.g. Render). On Linux, rebuild from source so the .node links to this OS.
 * On Windows/macOS, skip (local dev keeps npm fast).
 */
const { execSync } = require("child_process");
const path = require("path");

if (process.platform !== "linux") {
  process.exit(0);
}

const root = path.join(__dirname, "..");
console.log("[postinstall] Linux detected: rebuilding sqlite3 for this glibc…");
try {
  execSync("npm rebuild sqlite3 --build-from-source", {
    stdio: "inherit",
    cwd: root,
    env: process.env,
  });
} catch (err) {
  console.error("[postinstall] sqlite3 rebuild failed:", err?.message || err);
  process.exit(1);
}
