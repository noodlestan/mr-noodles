import { NOODLES_DB_EXT } from '../../../env';

export const isDataFile = (filename: string): boolean => {
    return filename === NOODLES_DB_EXT || filename.endsWith(NOODLES_DB_EXT);
};
