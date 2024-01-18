import { ISort } from '../../query';
import { ImageFile } from '../Images/types';

export type UserFolder = {
    name: string;
    path: string;
};

export interface UserModel {
    id: string;
    type: 'user';
    filename: string;
    dateCreated: Date;
    dateUpdated?: Date;
    citizen: boolean;
    dateCitizen?: Date;
    name?: string;
    avatar?: string;
    images?: ImageFile[];
    folders?: UserFolder[];
}

export interface UserData extends Omit<UserModel, 'dateCreated' | 'dateUpdated' | 'dateCitizen'> {
    dateCreated: string;
    dateUpdated?: string;
    dateCitizen?: string;
}

export interface UserFilter {
    id?: string;
    name?: string;
    citizen?: boolean;
}

export interface UserQuery {
    sortBy?: ISort[];
    filterBy?: UserFilter;
}
