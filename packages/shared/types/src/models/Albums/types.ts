export interface AlbumSchema {
    dateCreated: Date;
    dateUpdated?: Date;
    slug: string;
    title?: string;
    thumbs?: Array<{
        h: number;
        f: string;
    }>;
    photos: Array<string>;
    dateFrom?: Date;
    dateUntil?: Date;
    location?: {
        type: string;
        coordinates: Array<number>;
    };
}

export interface AlbumData extends Omit<AlbumSchema, 'photos' | 'location'> {
    id: string;
    photos: string[];
    location?: {
        lat: number;
        long: number;
    };
}

export interface AlbumDataPublic
    extends Omit<AlbumData, 'dateCreated' | 'dateUpdated' | 'dateFrom' | 'dateUntil'> {
    dateCreated: string;
    dateUpdated?: string;
    dateFrom?: string;
    dateUntil?: string;
}
