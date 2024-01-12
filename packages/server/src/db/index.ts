import mongoose from 'mongoose';

import { MONGODB_URI } from '../env';
import { log } from '../logger';

const connect = async (): Promise<void> => {
    await mongoose.connect(MONGODB_URI, {});
    log().info('db');
};

const disconnect = async (): Promise<void> => {
    await mongoose.disconnect();
    log().info('db:disconnected');
};

export { connect, disconnect };
