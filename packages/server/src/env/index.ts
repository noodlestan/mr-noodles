import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { NODE_ENV, LOG_FILE, PORT = 8008, MONGODB_URI = 'mongodb://localhost:27017' } = process.env;

export { NODE_ENV, LOG_FILE, PORT, MONGODB_URI };
