import type { UserNoodle, UserRoot } from '@noodlestan/shared-types';
import { Accessor } from 'solid-js';

import { Op, useAction } from '../useAction';

import { addRootToUser } from '@/resources/Users/addRootToUser';
import { createUsersResource } from '@/resources/Users/createUsersResource';
import { deleteUserRoot } from '@/resources/Users/deleteUserRoot';
import { updateUserRoot } from '@/resources/Users/updateUserRoot';

type UsersService = {
    loading: Accessor<boolean>;
    users: Accessor<UserNoodle[]>;
    error: Accessor<string>;
    getUserByid: (id: string) => UserNoodle | undefined;
    useAddRootToUser: () => Op<[UserNoodle, UserRoot], UserNoodle>;
    useUpdateUserRoot: () => Op<[UserNoodle, UserRoot], UserNoodle>;
    useDeleteUserRoot: () => Op<[UserNoodle, UserRoot], UserNoodle>;
};

export const createUsersService = (): UsersService => {
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
