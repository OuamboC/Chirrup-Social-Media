function hasValidSessionToken() {
  const t = localStorage.getItem("session_token");
  if (t == null || t === "") return false;
  if (t === "undefined" || t === "null") return false;
  return true;
}

const ifAuthenticated = (to, from, next) => {
  if (hasValidSessionToken()) {
    next();
    return;
  }
  next("/login");
};
export const auth = {
    ifAuthenticated
}