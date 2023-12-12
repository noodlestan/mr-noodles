import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const {
    NODE_ENV,
    LOG_FILE,
    PORT = 8008,
    MONGODB_URI = 'mongodb://localhost:27017',
    SCAN_NOW,
} = process.env;

const SCAN_EXTENSIONS = (process.env.SCAN_EXTENSIONS || '.jpg,.jpeg,.png,.gif').split(',');
const SCAN_DIR = path.resolve(process.env.SCAN_DIR || '../../demo/good');
const PUBLIC_ASSETS_DIR = path.resolve(process.env.PUBLIC_ASSETS_DIR || '../../assets');
const PUBLIC_ASSETS_BASE_URL =
    process.env.PUBLIC_ASSETS_BASE_URL || `http://localhost:${PORT}/assets`;

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
