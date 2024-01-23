import { Mapper, Noodle, Root } from '../types';

export function createMapper<T extends Noodle>(
    name: string,
    matcher: (data: T) => boolean,
    factory: (data: T, root: Root, filename?: string) => T,
    importer: (data: T) => T,
    exporter: (noodle: T) => T,
): Mapper {
    return {
        name,
        match: matcher as (data: unknown) => boolean,
        factory: factory as (data: unknown, root: Root) => T,
        import: importer as (data: unknown) => T,
        export: exporter as (noodle: Noodle) => unknown,
    };
}
