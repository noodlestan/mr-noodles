import { BaseNoodle } from '../Noodles/types';

export interface FolderNoodle extends BaseNoodle {
    type: 'folder';
    dateFrom?: Date;
    dateUntil?: Date;
}

// export interface FolderNoodle
//     extends Omit<FolderNoodle, 'dateCreated' | 'dateUpdated' | 'dateFrom' | 'dateUntil'> {
//     dateCreated: string;
//     dateUpdated?: string;
//     dateFrom?: string;
//     dateUntil?: string;
// }
