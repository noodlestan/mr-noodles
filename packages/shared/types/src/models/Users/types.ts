import { ISort } from '../../query/index.js';
import { BaseNoodle } from '../Noodles/types.js';

export type UserRoot = {
    date: Date;
    id: string;
    name: string;
    path: string;
};

export interface UserNoodle extends BaseNoodle {
    type: 'user';
    citizen: boolean;
    dateCitizen?: Date;
    name: string;
    avatar?: string;
    roots?: UserRoot[];
}

// export interface UserNoodle extends Omit<UserNoodle, 'dateCreated' | 'dateUpdated' | 'dateCitizen'> {
//     dateCreated: string;
//     dateUpdated?: string;
//     dateCitizen?: string;
// }

export interface UserFilter {
    id?: string;
    name?: string;
    citizen?: boolean;
}

export interface UserQuery {
    sortBy?: ISort[];
    filterBy?: UserFilter;
}
