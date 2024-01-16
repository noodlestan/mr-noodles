import { closeSync, openSync, rmSync, utimesSync } from 'fs';
import { join } from 'path';

export const canWriteToPath = (path: string): boolean => {
    const filename = join(path, '.test');
    try {
        try {
            utimesSync(filename, new Date(), new Date());
        } catch (err) {
            closeSync(openSync(filename, 'w'));
        }
        rmSync(filename);
        return true;
    } catch (err) {
        return false;
    }
};
