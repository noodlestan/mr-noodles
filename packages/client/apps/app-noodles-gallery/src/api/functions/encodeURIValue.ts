import type { QueryParam } from '@noodlestan/shared-types';

export const encodeURIValue = (value: QueryParam): string => {
    return encodeURIComponent(value as string);
};
