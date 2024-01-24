import type { BaseNoodle } from '@noodlestan/shared-types';

import { Predicate } from './Predicate';

export function createPredicate<T extends BaseNoodle, A extends unknown[]>(
    fn: (n: T, ...args: A) => boolean,
    ...args: A
): Predicate<T> {
    return noodle => fn(noodle, ...args);
}
