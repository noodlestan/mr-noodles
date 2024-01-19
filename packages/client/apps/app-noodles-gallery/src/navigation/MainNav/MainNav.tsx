import { IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Calendar, Folder, LogOut } from 'lucide-solid';
import { Component } from 'solid-js';

import { MainNavButton } from '../MainNavButton/MainNavButton';

import { CurrentUserIcon } from '@/atoms/CurrentUserIcon/CurrentUserIcon';
import { useCurrentUserContext } from '@/providers/CurrentUser';

import './MainNav.css';

export const MainNav: Component = () => {
    const { bus } = useCurrentUserContext();
    const handleExit = () => bus.emit({ name: 'clearCurrentUserId' });
    return (
        <Surface tag="nav" variant="banner" classList={{ MainNav: true }}>
            <Flex direction="row" padding="s" gap="xl" justify="stretch" align="center">
                <div class="MainNav-home">
                    <CurrentUserIcon />
                </div>
                <Flex direction="row" gap="s" classList={{ 'MainNav-center': true }}>
                    <MainNavButton href="/folders" icon={Folder} label="Folders" />
                    <MainNavButton href="/timeline" icon={Calendar} label="Timeline" />
                </Flex>
                <Flex
                    direction="row"
                    padding="s"
                    gap="xl"
                    justify="end"
                    align="center"
                    classList={{ 'MainNav-last': true }}
                >
                    <IconButton
                        classList={{ 'MainNav-exit': true }}
                        variant="plain"
                        size="m"
                        onClick={handleExit}
                        icon={LogOut}
                    />
                </Flex>
            </Flex>
        </Surface>
    );
};
