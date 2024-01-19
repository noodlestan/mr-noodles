import { BaseNoodle } from './types';

export function exportNoodle<T extends BaseNoodle>(noodle: T): T {
    const { id, ...rest } = noodle;
    return {
        id,
        ...rest,
    } as T;
}
