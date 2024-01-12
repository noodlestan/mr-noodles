/* eslint-disable @typescript-eslint/no-use-before-define */
import { ImageFile, UserData, UserDataPublic, UserSchema } from '@noodlestan/shared-types';
import type { HydratedDocument, Model } from 'mongoose';
import { Schema, Types, model } from 'mongoose';

import { mapImagesToEndpointUrls } from '../../services/images/mapImagesToEndpointUrls';

interface Methods {
    toData: () => UserData;
    toDataPublic: () => UserData;
}

interface IModel extends Model<UserSchema, object, Methods> {
    fromData: (json: Partial<UserData>) => UserDocument;
    findByName: (name: string) => Promise<UserDocument>;
    addImageToUser(id: Types.ObjectId, images: ImageFile): Promise<void>;
}

export type UserDocument = HydratedDocument<UserSchema> & Methods & { _id: Types.ObjectId };

const schema = new Schema<UserSchema, IModel, Methods>({
    dateCreated: { type: Date, required: true },
    dateUpdated: { type: Date },
    citizen: { type: Boolean },
    dateCitizen: { type: Date },
    name: { type: String },
    filename: { type: String },
    images: [
        {
            w: Number,
            h: Number,
            f: String,
            p: String,
        },
    ],
});

schema.method('toData', function (): UserData {
    const { id, images, ...rest } = this;
    return {
        id,
        ...rest,
        images: images && mapImagesToEndpointUrls(images),
    };
});

schema.method('toDataPublic', function (): UserDataPublic {
    const data = this.toData();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, dateCreated, dateUpdated, dateCitizen, ...rest } = data;
    return {
        id,
        dateCreated: dateCreated.toISOString(),
        dateUpdated: dateUpdated?.toISOString(),
        dateCitizen: dateCitizen?.toISOString(),
        ...rest,
    };
});

schema.static('fromData', (partial: Partial<UserData>): UserDocument => {
    return new UserModel(partial);
});

schema.static('findByName', async (name: string): Promise<UserDocument | undefined> => {
    const results = await UserModel.find({ name }).exec();
    return results && results[0];
});

schema.static('addImageToUser', async (id: Types.ObjectId, image: ImageFile): Promise<void> => {
    const updates = {
        $push: { images: image },
        $set: {
            dateUpdated: new Date(),
        },
    };
    await UserModel.findByIdAndUpdate(id, updates);
});

const UserModel = model<UserSchema, IModel>('User', schema);

export { UserModel as User };
