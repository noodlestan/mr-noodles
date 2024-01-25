import type { ISort, Noodle } from '@noodlestan/shared-types';

type NoodleKey = keyof Noodle;

type CompareResult = -1 | 0 | 1;

const compareValues = (v1: string | number | Date, v2: string | number | Date): CompareResult => {
    if (v1 === v2) {
        return 0;
    }
    if (v2 === undefined) {
        return 1;
    }
    if (v1 === undefined) {
        return -1;
    }
    if (typeof v1 === 'string' && typeof v2 === 'string') {
        return v1 > v2 ? 1 : -1;
    } else if (typeof v1 === 'number' && typeof v2 === 'number') {
        return v1 - v2 > 0 ? 1 : -1;
    } else if (typeof v1 === 'object' && typeof v2 === 'object') {
        const v1_ = v1.valueOf();
        const v2_ = v2.valueOf();
        if (isNaN(v1_) && isNaN(v2_)) {
            return 0;
        }
        if (isNaN(v1_)) {
            return -1;
        }
        if (isNaN(v2_)) {
            return 1;
        }
        return v1_ - v2_ > 0 ? 1 : -1;
    }
    return 0;
};

export function sortNoodles<T extends Noodle>(noodles: T[], sort: ISort[]): T[] {
    return noodles.sort((a, b) => {
        let compare = 0;
        for (const s of sort) {
            const { field, dir } = s;
            const v1 = a[field as NoodleKey];
            const v2 = b[field as NoodleKey];
            const current = compareValues(v1, v2);
            if (current !== 0) {
                compare = dir === 'asc' ? current : current * -1;
                break;
            }
        }
        return compare;
    });
}
