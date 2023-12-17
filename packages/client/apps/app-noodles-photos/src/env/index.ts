const env = import.meta.env;

const { API_PORT = 8008 } = env;

const API_BASE_URL = env.API_BASE_URL || `http://localhost:${API_PORT}`;

export { API_BASE_URL };
