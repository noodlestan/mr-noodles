/* eslint-disable @typescript-eslint/no-use-before-define */
import type { HydratedDocument, Model } from 'mongoose';
import { Schema, Types, model } from 'mongoose';

import { makeThumbPublicUrl } from '../../services/thumbs/makeThumbPublicUrl';

export interface AlbumSchema {
    dateCreated: Date;
    dateUpdated?: Date;
    slug: string;
    title?: string;
    thumb?: string;
    photos: Types.Array<Types.ObjectId>;
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

interface Methods {
    toData: () => AlbumData;
    toDataPublic: () => AlbumData;
}

interface IModel extends Model<AlbumSchema, object, Methods> {
    fromData: (json: Partial<AlbumData>) => AlbumDocument;
    findBySlug: (slug: string) => Promise<AlbumDocument>;
    addThumbToAlbum(id: Types.ObjectId, thumb: string): Promise<void>;
}

export type AlbumDocument = HydratedDocument<AlbumSchema> & Methods & { _id: Types.ObjectId };

const schema = new Schema<AlbumSchema, IModel, Methods>({
    dateCreated: { type: Date, required: true },
    dateUpdated: { type: Date },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true, max: 100 },
    thumb: { type: String },
    photos: [Types.ObjectId],
    dateFrom: { type: Date },
    dateUntil: { type: Date },
    location: {
        type: Object,
        required: false,
        attributes: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
    },
});

schema.method('toData', function (): AlbumData {
    const {
        id,
        dateCreated,
        dateUpdated,
        slug,
        title,
        thumb,
        photos,
        dateFrom,
        dateUntil,
        location,
    } = this;
    const lat = location?.coordinates[0];
    const long = location?.coordinates[0];
    const loc = lat && long ? { lat, long } : undefined;
    return {
        id,
        dateCreated,
        dateUpdated,
        slug,
        title,
        thumb: thumb && makeThumbPublicUrl(thumb),
        photos: photos.map(i => i.toString()),
        dateFrom,
        dateUntil,
        location: loc,
    };
});

schema.method('toDataPublic', function (): AlbumDataPublic {
    const data = this.toData();
    const { id, dateCreated, dateUpdated, dateFrom, dateUntil, ...rest } = data;
    return {
        id,
        dateCreated: dateCreated.toISOString(),
        dateUpdated: dateUpdated?.toISOString(),
        dateFrom: dateFrom?.toISOString(),
        dateUntil: dateUntil?.toISOString(),
        ...rest,
    };
});

schema.static('fromData', (partial: Partial<AlbumData>): AlbumDocument => {
    const { id, dateCreated, dateUpdated, slug, title, thumb, dateFrom, dateUntil, location } =
        partial;
    const { lat, long } = location || {};
    const data: Partial<AlbumSchema> = {
        dateCreated,
        dateUpdated,
        slug,
        title,
        thumb,
        photos: new Types.Array(),
        dateFrom,
        dateUntil,
    };
    if (lat && long) {
        data.location = {
            type: 'Point',
            coordinates: [lat, long],
        };
    }

    return new AlbumModel({ id, ...data });
});

schema.static('findBySlug', async (slug: string): Promise<AlbumDocument | undefined> => {
    const results = await AlbumModel.find({ slug }).exec();
    return results && results[0];
});

schema.static('addThumbToAlbum', async (id: Types.ObjectId, thumb: string): Promise<void> => {
    await AlbumModel.findByIdAndUpdate(id, { thumb }).exec();
});

const AlbumModel = model<AlbumSchema, IModel>('Album', schema);

export { AlbumModel as Album };