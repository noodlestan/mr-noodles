import { Root } from '../types.js';

export function exportRoot(data: Root): Omit<Root, 'path'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { path: path_, ...d } = data;
    return d;
}
