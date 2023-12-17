export type Direction = 'asc' | 'desc';

export interface IPagination {
    page: number;
    size: number;
}

export interface ISort {
    field: string;
    dir: Direction;
}

export interface IGroup {
    field: string;
    group?: string;
    dir: Direction;
}

export type QueryParam = string | number | boolean | undefined | QueryParam[];

export type QueryParams = Record<string, QueryParam>;
