import { NavLink } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { useLocation } from '@solidjs/router';
import { Component } from 'solid-js';

import { ThemeSelect } from '@/components/ThemeSelect';

import './AppNav.css';

export const AppNav: Component = () => {
    const location = useLocation();
    const isHome = () => location.pathname === '/';

    return (
        <Flex
            tag="header"
            padding="l"
            gap="m"
            direction="row"
            align="center"
            full
            classList={{ AppNav: true }}
        >
            <Flex tag="nav" gap="m" direction="row">
                <NavLink size="m" exact={true} active={isHome()} href={'/'} label="Home" />
                <NavLink size="m" href={'/components'} label="Components" />
                <NavLink size="m" href={'/themes'} label="Themes" />
                <NavLink size="m" href={'/tokens'} label="Tokens" />
            </Flex>
            <div class="AppNav--Tools">
                <ThemeSelect />
            </div>
        </Flex>
    );
};
