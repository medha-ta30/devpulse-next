// Access token stored in memory only — not localStorage, not sessionStorage
// This means it's gone on page refresh, which is fine because
// AuthContext will call /refresh-token on load to get a new one
// using the HttpOnly cookie the browser sends automatically

let _accessToken = null;

export function setAccessToken(token) {
  _accessToken = token;
}

export function getAccessToken() {
  return _accessToken;
}

export function clearAccessToken() {
  _accessToken = null;
}
