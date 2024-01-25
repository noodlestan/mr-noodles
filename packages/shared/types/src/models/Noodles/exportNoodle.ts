import { BaseNoodle } from './types.js';

export function exportNoodle<T extends BaseNoodle>(noodle: T): T {
    const { id, ...rest } = noodle;
    return {
        ...rest,
        id,
    } as T;
}
