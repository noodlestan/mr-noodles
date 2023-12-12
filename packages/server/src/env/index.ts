import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const { env } = process;

const {
    NODE_ENV,
    LOG_FILE,
    PORT = 8008,
    MONGODB_URI = 'mongodb://localhost:27017',
    SCAN_NOW,
} = env;

const SCAN_DIR = path.resolve(env.SCAN_DIR || '../../resources/example-media/good');
const SCAN_EXTENSIONS = (env.SCAN_EXTENSIONS || '.jpg,.jpeg,.png,.gif').split(',');
const PUBLIC_ASSETS_DIR = path.resolve(env.PUBLIC_ASSETS_DIR || '../../resources/assets');
const PUBLIC_ASSETS_BASE_URL = env.PUBLIC_ASSETS_BASE_URL || `http://localhost:${PORT}/assets`;

export {
    NODE_ENV,
    LOG_FILE,
    PORT,
    MONGODB_URI,
    SCAN_DIR,
    SCAN_NOW,
    SCAN_EXTENSIONS,
    PUBLIC_ASSETS_DIR,
    PUBLIC_ASSETS_BASE_URL,
};
