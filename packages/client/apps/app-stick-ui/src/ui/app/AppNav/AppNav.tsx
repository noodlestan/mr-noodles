import { RouterService } from '@noodlestan/ui-app-router';
import { NavLink } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Component, For } from 'solid-js';

import { ThemeSelect } from '@/ui/components/ThemeSelect';
import { ROUTES, ROUTE_HOME } from '@/ui/routes';

import './AppNav.css';

export const AppNav: Component = () => {
    const { route, setRoute } = inject(RouterService);

    const isHome = () => {
        const r = route();
        return !r || r === ROUTE_HOME;
    };

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
                <NavLink size="m" active={isHome()} onClick={() => setRoute(ROUTE_HOME)}>
                    Home
                </NavLink>
                <For each={ROUTES}>
                    {item => (
                        <NavLink
                            size="m"
                            active={!!route()?.startsWith(item.route)}
                            onClick={() => setRoute(item.route)}
                        >
                            {item.name}
                        </NavLink>
                    )}
                </For>
            </Flex>
            <div class="AppNav--tools">
                <ThemeSelect />
            </div>
        </Flex>
    );
};
