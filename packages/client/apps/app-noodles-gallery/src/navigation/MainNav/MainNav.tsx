import { Flex } from '@noodlestan/ui-layouts';
import { Calendar, Folder } from 'lucide-solid';
import { Component } from 'solid-js';

import './MainNav.css';
import { MainNavButton } from '../MainNavButton/MainNavButton';

import { CurrentUserIcon } from '@/atoms/CurrentUserIcon/CurrentUserIcon';

export const MainNav: Component = () => {
    return (
        <Flex padding="s" gap="xl" justify="start" align="start" classList={{ MainNav: true }}>
            <div class="MainNav-home">
                <CurrentUserIcon />
            </div>
            <Flex gap="s" justify="start" align="start">
                <MainNavButton href="/folders" icon={Folder} label="Folders" />
                <MainNavButton href="/timeline" icon={Calendar} label="Timeline" />
            </Flex>
        </Flex>
    );
};
