/* eslint-disable @typescript-eslint/no-use-before-define */
import type { HydratedDocument, Model } from 'mongoose';
import { Schema, Types, model } from 'mongoose';

export type PhotoMessageLevel = 'error' | 'warning';

export interface PhotoMessageSchema {
    dateCreated: Date;
    level: PhotoMessageLevel;
    message: string;
    filename?: string;
}

export type PhotoMessageData = PhotoMessageSchema;

export type MessageDataPublic = PhotoMessageData;

interface Methods {
    toData: () => PhotoMessageData;
    toDataPublic: () => PhotoMessageData;
}
interface IModel extends Model<PhotoMessageSchema, object, Methods> {
    fromData: (json: Partial<PhotoMessageData>) => PhotoMessageDocument;
}

export type PhotoMessageDocument = HydratedDocument<PhotoMessageSchema> &
    Methods & { _id: Types.ObjectId };

const schema = new Schema<PhotoMessageSchema, IModel, Methods>({
    dateCreated: { type: Date, required: true },
    level: { type: String, required: true },
    message: { type: String, required: true },
    filename: { type: String },
});

schema.method('toData', function (): PhotoMessageData {
    return this.toJSON();
});

schema.method('toDataPublic', function (): MessageDataPublic {
    return this.toData();
});

schema.static('fromData', (partial: Partial<PhotoMessageData>): PhotoMessageDocument => {
    return new PhotoMessageModel({ ...partial });
});

const PhotoMessageModel = model<PhotoMessageSchema, IModel>('PhotoMessage', schema);

export { PhotoMessageModel as PhotoMessage };
