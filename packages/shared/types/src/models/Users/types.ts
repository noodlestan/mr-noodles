import { ISort } from '../../query';
import { ImageFile } from '../Images/types';

export interface UserSchema {
    dateCreated: Date;
    dateUpdated?: Date;
    citizen: boolean;
    dateCitizen: Date;
    name?: string;
    filename?: string;
    images?: ImageFile[];
}

export interface UserData extends UserSchema {
    id: string;
}

export interface UserDataPublic
    extends Omit<UserData, 'dateCreated' | 'dateUpdated' | 'dateCitizen'> {
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
