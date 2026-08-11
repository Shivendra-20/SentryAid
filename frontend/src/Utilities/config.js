const LOCAL_API = "http://localhost:5000";

export const API_URL = (
  import.meta.env.VITE_API_URL ?? LOCAL_API
).replace(/\/$/, "");

export const apiBaseURL = `${API_URL}/api`;
export const socketURL = API_URL;

if (import.meta.env.DEV) {
  console.info("[SentryAid] API:", apiBaseURL);
}
