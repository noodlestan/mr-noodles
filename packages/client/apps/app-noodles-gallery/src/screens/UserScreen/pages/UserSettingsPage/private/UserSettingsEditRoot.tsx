import type { Root, UserNoodle, UserRoot } from '@noodlestan/shared-types';
import { inject } from '@noodlestan/ui-services';
import { Component, createSignal } from 'solid-js';

import { DeleteUserRootDialog } from './DeleteUserRootDialog';
import { UserSettingsRootForm } from './UserSettingsRootForm';

import { useCurrentUserContext } from '@/providers/CurrentUser';
import { UsersService } from '@/services/Users';

type UserSettingsEditRootProps = {
    root: UserRoot;
    onCancel?: () => void;
    onDone?: () => void;
};

export const UserSettingsEditRoot: Component<UserSettingsEditRootProps> = props => {
    const { useUpdateUserRoot } = inject(UsersService);

    const { currentUser } = useCurrentUserContext();
    const { acting, error, act } = useUpdateUserRoot();
    const [editing, setEditing] = createSignal<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = createSignal<boolean>(false);

    const handleEdit = () => setEditing(true);
    const handleDelete = () => setShowDeleteDialog(true);
    const handleDialogDone = () => setShowDeleteDialog(false);

    const handleCancel = () => {
        setEditing(false);
        props.onCancel && props.onCancel();
    };

    const handleSave = async (root: Root) => {
        const user = currentUser() as UserNoodle;
        await act(user, {
            ...props.root,
            name: root.name,
            path: root.path,
        });
        if (!error()) {
            setEditing(false);
            props.onDone && props.onDone();
        }
    };

    return (
        <>
            <UserSettingsRootForm
                root={props.root}
                editing={editing()}
                saving={acting()}
                error={error()}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSave={handleSave}
                onCancel={handleCancel}
            />
            <DeleteUserRootDialog
                show={showDeleteDialog()}
                root={props.root}
                onDone={handleDialogDone}
            />
        </>
    );
};
