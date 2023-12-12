/* eslint-disable @typescript-eslint/no-use-before-define */
import type { HydratedDocument, Model } from 'mongoose';
import { Schema, Types, model } from 'mongoose';

export interface PhotoSchema {
    dateCreated: Date;
    dateUpdated?: Date;
    hash: string;
    filename: string;
    album?: string;
    title?: string;
    date?: Date;
    orientation: number;
    width: number;
    height: number;
    location?: {
        type: string;
        coordinates: Array<number>;
    };
}

export interface PhotoData extends Omit<PhotoSchema, 'location'> {
    id: string;
    location?: {
        lat: number;
        long: number;
    };
}

export interface PhotoDataPublic
    extends Omit<PhotoData, 'filename' | 'dateCreated' | 'dateUpdated' | 'date'> {
    dateCreated: string;
    dateUpdated?: string;
    date?: string;
}

interface Methods {
    toData: () => PhotoData;
    toDataPublic: () => PhotoData;
}

interface IModel extends Model<PhotoSchema, object, Methods> {
    fromData: (json: Partial<PhotoData>) => PhotoDocument;
    findByHash: (hash: string) => Promise<PhotoDocument>;
    findByFilename: (filename: string) => Promise<PhotoDocument>;
    findByFilenameOrHash: (filename: string, hash: string) => Promise<PhotoDocument>;
}

export type PhotoDocument = HydratedDocument<PhotoSchema> & Methods & { _id: Types.ObjectId };

const schema = new Schema<PhotoSchema, IModel, Methods>({
    dateCreated: { type: Date, required: true },
    dateUpdated: { type: Date },
    hash: { type: String, required: true },
    filename: { type: String, required: true },
    album: { type: String },
    title: { type: String, max: 100 },
    date: { type: Date },
    orientation: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
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

schema.method('toData', function (): PhotoData {
    const {
        id,
        dateCreated,
        dateUpdated,
        hash,
        filename,
        album,
        title,
        date,
        orientation,
        width,
        height,
        location,
    } = this;
    const lat = location?.coordinates[0];
    const long = location?.coordinates[0];
    const loc = lat && long ? { lat, long } : undefined;
    return {
        id,
        dateCreated,
        dateUpdated,
        hash,
        filename,
        album,
        title,
        date,
        orientation,
        width,
        height,
        location: loc,
    };
});

schema.method('toDataPublic', function (): PhotoDataPublic {
    const data = this.toData();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, dateCreated, dateUpdated, date, filename, ...rest } = data;
    return {
        id,
        dateCreated: dateCreated.toISOString(),
        dateUpdated: dateUpdated?.toISOString(),
        date: date?.toISOString(),
        ...rest,
    };
});

schema.static('fromData', (partial: Partial<PhotoData>): PhotoDocument => {
    const {
        id,
        dateCreated,
        dateUpdated,
        hash,
        filename,
        album,
        title,
        date,
        orientation,
        width,
        height,
        location,
    } = partial;
    const { lat, long } = location || {};
    const data: Partial<PhotoSchema> = {
        dateCreated,
        dateUpdated,
        hash,
        filename,
        album,
        title,
        date,
        orientation,
        width,
        height,
    };
    if (lat && long) {
        data.location = {
            type: 'Point',
            coordinates: [lat, long],
        };
    }

    return new PhotoModel({ id, ...data });
});

schema.static('findByHash', async (hash: string): Promise<PhotoDocument | undefined> => {
    const results = await PhotoModel.find({ hash }).exec();
    return results && results[0];
});

schema.static('findByFilename', async (filename: string): Promise<PhotoDocument | undefined> => {
    const results = await PhotoModel.find({ filename }).exec();
    return results && results[0];
});

schema.static(
    'findByFilenameOrHash',
    async (filename: string, hash: string): Promise<PhotoDocument | undefined> => {
        const byFilename = await PhotoModel.findByFilename(filename);
        if (byFilename) {
            return byFilename;
        } else {
            const results = await PhotoModel.find({ hash }).exec();
            return results && results[0];
        }
    },
);

const PhotoModel = model<PhotoSchema, IModel>('Photo', schema);

export { PhotoModel as Photo };
