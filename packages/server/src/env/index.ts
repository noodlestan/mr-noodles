import { resolve } from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const { env } = process;

const DEFAULT_API_PORT = 8008;
const DEFAULT_NOOODLES_DB_PATH = '../../resources/db';
const DEFAULT_NOOODLES_DB_EXT = '.noodle.json';
const DEFAULT_PUBLIC_ASSETS_DIR = '../../resources/assets';
const DEFAULT_SCAN_EXTENSIONS = '.jpg,.jpeg,.png,.gif';

const { NODE_ENV, LOG_FILE } = env;

const API_PORT = Number(env.API_PORT || DEFAULT_API_PORT);
const NOODLES_DB_EXT = env.NOODLES_DB_EXT || DEFAULT_NOOODLES_DB_EXT;
const NOODLES_DB_PATH = resolve(env.NOODLES_DB_PATH || DEFAULT_NOOODLES_DB_PATH);
const SCAN_EXTENSIONS = (env.SCAN_EXTENSIONS || DEFAULT_SCAN_EXTENSIONS).split(',');
const PUBLIC_ASSETS_DIR = resolve(env.PUBLIC_ASSETS_DIR || DEFAULT_PUBLIC_ASSETS_DIR);
const PUBLIC_ASSETS_BASE_URL = env.PUBLIC_ASSETS_BASE_URL || `http://localhost:${API_PORT}/assets`;
const API_BASE_URL = env.API_BASE_URL || `http://localhost:${API_PORT}`;

export {
    NODE_ENV,
    LOG_FILE,
    API_PORT,
    NOODLES_DB_PATH,
    NOODLES_DB_EXT,
    SCAN_EXTENSIONS,
    PUBLIC_ASSETS_DIR,
    PUBLIC_ASSETS_BASE_URL,
    API_BASE_URL,
};
