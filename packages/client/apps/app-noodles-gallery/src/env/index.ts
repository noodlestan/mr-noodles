const env = import.meta.env;

const API_PORT = env.VITE_API_PORT || 8008;
const API_BASE_URL = env.VITE_API_BASE_URL || `http://localhost:${API_PORT}`;
const ASSETS_BASE_URL = env.VITE_ASSETS_BASE_URL || `http://localhost:${API_PORT}/assets`;

export { API_BASE_URL, ASSETS_BASE_URL };
