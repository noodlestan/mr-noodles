export type MongoPoint = { type: 'Point'; coordinates: [number, number] };

export type MongoSortOrder = -1 | 1;

export type MongoSort = { [key: string]: MongoSortOrder };
