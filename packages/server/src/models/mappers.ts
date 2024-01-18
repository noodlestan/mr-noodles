import { FolderData, PhotoData, UserData } from '@noodlestan/shared-types';

import { Mappers, Noodle } from '../noodles/types';

import { folderFromData } from './folder';
import { photoFromData } from './photo';
import { userFromData } from './user';

export const mappers: Mappers = [
    {
        name: 'user',
        match: (n: Noodle) => n.type === 'user',
        map: (n: unknown) => userFromData(n as UserData),
    },
    {
        name: 'folder',
        match: (n: Noodle) => n.type === 'folder',
        map: (n: unknown) => folderFromData(n as FolderData),
    },
    {
        name: 'photo',
        match: (n: Noodle) => n.type === 'photo',
        map: (n: unknown) => photoFromData(n as PhotoData),
    },
];
