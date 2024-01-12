import { Types, isValidObjectId } from 'mongoose';

import type { UserDocument } from '../../models/user';
import { User } from '../../models/user';

export const findUserById = async (
    id: string | Types.ObjectId,
): Promise<UserDocument | undefined> => {
    const photo = isValidObjectId(id) && (await User.findById(id));
    return photo || undefined;
};
