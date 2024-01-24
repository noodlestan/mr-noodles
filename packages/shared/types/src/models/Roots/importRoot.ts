import { importDate } from '../functions/importDate.js';
import { Root } from '../types.js';

export function importRoot(data: Root): Root {
    const { date } = data;

    return {
        ...data,
        date: importDate(date) as Date,
    };
}
