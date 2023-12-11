import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const {
    NODE_ENV,
    LOG_FILE,
    PORT = 8008,
    MONGODB_URI = 'mongodb://localhost:27017',
    SCAN_NOW,
    SCAN_DIR = '../../demo/good',
} = process.env;

export { NODE_ENV, LOG_FILE, PORT, MONGODB_URI, SCAN_DIR, SCAN_NOW };
