// import { Text } from '@noodlestan/ui-atoms';
import { IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { HeartIcon, LogOut, SettingsIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import { MainNavButton } from '@/navigation/MainNavButton/MainNavButton';
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
                    <Flex direction="row" gap="m">
                        <MainNavButton icon={SettingsIcon} href="/settings" label="Settings" />
                        <MainNavButton icon={HeartIcon} href="/favorites" label="Favorites" />
                    </Flex>
                    <IconButton variant="primary" size="m" onClick={handleLogout} icon={LogOut} />
                </Flex>
            </Flex>
        </Surface>
    );
};
