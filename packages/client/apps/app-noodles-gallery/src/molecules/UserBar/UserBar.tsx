// import { Text } from '@noodlestan/ui-atoms';
import { IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { LogOut } from 'lucide-solid';
import { Component } from 'solid-js';

import { useCurrentUserContext } from '@/providers/CurrentUser';

import './UserBar.css';

export type UserBarProps = {
    foo?: 'bar';
};

export const UserBar: Component<UserBarProps> = () => {
    const { bus } = useCurrentUserContext();
    const handleLogout = () => bus.emit({ name: 'unselectUser' });

    return (
        <Surface variant="page" classList={{ UserBar: true }}>
            <Flex padding="m">
                <Flex direction="row" gap="l" justify="between" align="center">
                    .
                    <IconButton variant="primary" size="m" onClick={handleLogout} icon={LogOut} />
                </Flex>
            </Flex>
        </Surface>
    );
};
