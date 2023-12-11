export interface IPagination {
    page: number;
    size: number;
}

export interface ISort {
    field: string;
    dir: 'asc' | 'desc';
}

export type MongoSortOrder = -1 | 1;

export type MongoSort = { [key: string]: MongoSortOrder };
