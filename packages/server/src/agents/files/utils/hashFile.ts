import crypto from 'crypto';

export const hashFile = (buff: Buffer): string => {
    return crypto.createHash('md5').update(buff).digest('hex');
};
