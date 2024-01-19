import type { UserNoodle, UserRoot } from '@noodlestan/shared-types';
import { Accessor } from 'solid-js';

import { Op, useAction } from '../useAction';

import { addRootToUser } from '@/resources/User/addRootToUser';
import { createUsersResource } from '@/resources/User/createUsersResource';
import { deleteUserRoot } from '@/resources/User/deleteUserRoot';
import { updateUserRoot } from '@/resources/User/updateUserRoot';

type FilesService = {
    loading: Accessor<boolean>;
    users: Accessor<UserNoodle[]>;
    getUserByid: (id: string) => UserNoodle | undefined;
    error: Accessor<string>;
    useAddRootToUser: () => Op<[UserNoodle, UserRoot], UserNoodle>;
    useUpdateUserRoot: () => Op<[UserNoodle, UserRoot], UserNoodle>;
    useDeleteUserRoot: () => Op<[UserNoodle, UserRoot], UserNoodle>;
};

export const createUsersService = (): FilesService => {
    const [resource, { mutate }] = createUsersResource();

    const loading = () => resource.loading;
    const users = () => resource()?.data || [];
    const error = () => resource.error;

    return {
        loading,
        users,
        error,
        getUserByid: (id: string) => users().find(user => user.id === id),
        useAddRootToUser: () =>
            useAction(async (user: UserNoodle, root: UserRoot) => {
                const { data } = await addRootToUser(user, root);
                mutate(users => users?.map(u => (u.id === user.id ? data : { ...u })));
                return data;
            }),
        useUpdateUserRoot: () =>
            useAction(async (user: UserNoodle, root: UserRoot) => {
                const { data } = await updateUserRoot(user, root);
                mutate(users => users?.map(u => (u.id === user.id ? data : { ...u })));
                return data;
            }),
        useDeleteUserRoot: () =>
            useAction(async (user: UserNoodle, root: UserRoot) => {
                const { data } = await deleteUserRoot(user, root);
                mutate(users => users?.map(u => (u.id === user.id ? data : { ...u })));
                return data;
            }),
    };
};
