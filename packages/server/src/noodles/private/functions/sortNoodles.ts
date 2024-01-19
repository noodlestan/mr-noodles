import type { ISort, Noodle } from '@noodlestan/shared-types';

type NoodleKey = keyof Noodle;

export function sortNoodles<T extends Noodle>(noodles: T[], sort: ISort[]): T[] {
    return noodles.sort((a, b) => {
        let compare = 0;
        for (const s of sort) {
            const { field } = s;
            const v1 = a[field as NoodleKey] as unknown;
            const v2 = b[field as NoodleKey] as unknown;
            const current = (v1 as number) - (v2 as number);
            if (current !== 0) {
                compare = current;
                break;
            }
        }
        return compare;
    });
}
