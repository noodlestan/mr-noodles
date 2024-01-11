import { Params } from '@solidjs/router';

export const useUrl = (searchParams: Partial<Params>, path: string): string => {
    const params = Object.keys(searchParams);

    const keyValues = params.map(key => `${key}=${searchParams[key]}`);

    return `${path}${keyValues.length ? '?' + keyValues.join('&') : ''}`;
};
