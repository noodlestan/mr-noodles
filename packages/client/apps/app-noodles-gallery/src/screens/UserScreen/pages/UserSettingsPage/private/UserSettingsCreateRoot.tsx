import type { Root, UserNoodle } from '@noodlestan/shared-types';
import { inject } from '@noodlestan/ui-services';
import { Component } from 'solid-js';

import { UserSettingsRootForm } from './UserSettingsRootForm';

import { useCurrentUserContext } from '@/providers/CurrentUser';
import { UsersService } from '@/services/Users';

type UserSettingsCreateRootProps = {
    onCancel?: () => void;
    onDone?: () => void;
};

export const UserSettingsCreateRoot: Component<UserSettingsCreateRootProps> = props => {
    const { useAddRootToUser } = inject(UsersService);

    const { currentUser } = useCurrentUserContext();
    const { acting, error, act } = useAddRootToUser();

    const newRoot = { date: new Date(), id: '', path: '', name: '', owner: '' };

    const handleSave = async (root: Root) => {
        const user = currentUser() as UserNoodle;
        await act(user, {
            ...newRoot,
            name: root.name,
            path: root.path,
        });
        if (!error()) {
            props.onDone && props.onDone();
        }
    };

    return (
        <UserSettingsRootForm
            root={newRoot}
            editing={true}
            saving={acting()}
            error={error()}
            onSave={handleSave}
            onCancel={props.onCancel}
        />
    );
};
