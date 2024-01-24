import { BaseNoodle } from '@noodlestan/shared-types';

import { Predicate } from './Predicate';

export function createMatcher<T extends BaseNoodle>(...predicates: Array<boolean | Predicate<T>>) {
    return (noodle: T): boolean => {
        return !predicates.find(predicate => {
            const match = typeof predicate === 'boolean' ? predicate : predicate(noodle);
            return match === false;
        });
    };
}
