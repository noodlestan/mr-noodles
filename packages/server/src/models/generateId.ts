import { createHash } from 'crypto';

import { v4 } from 'uuid';

export const generateId = (input?: string): string => {
    const value = input || v4();
    return createHash('md5').update(value).digest('hex');
};
