import axios from "axios";

const rawBaseURL = import.meta.env.VITE_API_URL || "/api";
const normalizedBaseURL = rawBaseURL.trim().replace(/\/+$/, "");
const baseURL = normalizedBaseURL.endsWith("/api")
    ? normalizedBaseURL
    : `${normalizedBaseURL}/api`;

// Create single instance and support custom backend base URL for production.
const api = axios.create({
    baseURL,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) { config.headers.Authorization = `Bearer ${token}`; }
    return config;
});

export default api;