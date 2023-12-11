import mongoose from 'mongoose';

import { MONGODB_URI } from '../env';
import { logger } from '../logger';

const connect = async (): Promise<void> => {
    await mongoose.connect(MONGODB_URI, {});
    logger.info('db');
};

export { connect };
