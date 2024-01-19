// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { HeartIcon, SettingsIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import { MainNavButton } from '@/navigation/MainNavButton/MainNavButton';

import './UserBar.css';

export type UserBarProps = {
    foo?: 'bar';
};

export const UserBar: Component<UserBarProps> = () => {
    return (
        <Surface variant="page" classList={{ UserBar: true }}>
            <Flex padding="m">
                <Flex direction="row" gap="l" justify="between" align="center">
                    <Flex direction="row" gap="m">
                        <MainNavButton icon={SettingsIcon} href="/user/settings" label="Settings" />
                        <MainNavButton icon={HeartIcon} href="/user/favorites" label="Favorites" />
                    </Flex>
                </Flex>
            </Flex>
        </Surface>
    );
};
