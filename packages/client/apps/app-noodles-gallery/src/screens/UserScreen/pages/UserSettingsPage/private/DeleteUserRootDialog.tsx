import type { UserNoodle, UserRoot } from '@noodlestan/shared-types';
import { Banner, Button, DataValue, Display, Icon, IconButton, Text } from '@noodlestan/ui-atoms';
import { ModalDialog } from '@noodlestan/ui-dialogs';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { AlertTriangleIcon, TrashIcon, X } from 'lucide-solid';
import { Component, Show } from 'solid-js';

import { useCurrentUserContext } from '@/providers/CurrentUser';
import { UsersService } from '@/services/Users';

import './DeleteUserRootDialog.css';

type DeleteUserRootDialogProps = {
    show: boolean;
    root: UserRoot;
    onDone: () => void;
};

export const DeleteUserRootDialog: Component<DeleteUserRootDialogProps> = props => {
    const { useDeleteUserRoot } = inject(UsersService);
    const { currentUser } = useCurrentUserContext();

    const { acting, error, act } = useDeleteUserRoot();
    const handleOnDeleteClick = async () => {
        const user = currentUser() as UserNoodle;
        await act(user, props.root);
        if (!error()) {
            setTimeout(() => props.onDone(), 2000);
        }
    };

    const handleDialogClose = () => {
        if (!acting()) {
            props.onDone();
        }
    };

    return (
        <ModalDialog size="m" show={props.show} onClose={handleDialogClose}>
            <Flex align="stretch" classList={{ DeleteUserRootDialog: true }}>
                <Flex gap="xl" classList={{ 'DeleteUserRootDialog--Content': true }}>
                    <Flex direction="row" gap="l" align="center" justify="between">
                        <Flex direction="row" gap="s">
                            <Icon size="l" icon={AlertTriangleIcon} />
                            <Display level={3}>Are you sure?</Display>
                        </Flex>
                        <IconButton
                            variant="plain"
                            icon={X}
                            onClick={handleDialogClose}
                            label="Close Dialog"
                        />
                    </Flex>
                    <Text>
                        You are about to remove your{' '}
                        <DataValue length={'auto'} wrap>
                            "{props.root.name}"
                        </DataValue>{' '}
                        folder:{' '}
                        <DataValue length={'auto'} wrap>
                            {props.root.path}
                        </DataValue>
                        .
                    </Text>
                    <Text>This action can not be undone.</Text>
                    <Text>
                        {' '}
                        You can always add the folder later but any data meanwhile captured by
                        Mr.Noodles mayb be lost.
                    </Text>
                </Flex>
                <Flex gap="m">
                    <Show when={error()}>
                        <Banner variant="danger">Shoot</Banner>
                    </Show>
                    <Flex direction="row" gap="m" justify="end">
                        <Button variant="plain" onClick={handleDialogClose}>
                            <Icon icon={X} /> Cancel
                        </Button>
                        <Button variant="danger" disabled={acting()} onClick={handleOnDeleteClick}>
                            <Icon icon={TrashIcon} /> Delete
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </ModalDialog>
    );
};
