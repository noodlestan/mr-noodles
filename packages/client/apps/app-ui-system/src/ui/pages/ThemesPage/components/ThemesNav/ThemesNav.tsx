import { RouterService } from '@noodlestan/ui-app-router';
import { NavLink } from '@noodlestan/ui-atoms';
import { inject } from '@noodlestan/ui-services';
import { Component, For } from 'solid-js';

import { THEMES } from '@/data/themes';
import { SideNav } from '@/ui/app/SideNav';

import './ThemesNav.css';

export const ThemesNav: Component = () => {
    const { route, setRoute } = inject(RouterService);

    return (
        <SideNav classList={{ ThemesNav: true }}>
            <For each={THEMES}>
                {theme => (
                    <NavLink
                        active={route() === `/themes/${theme.name}`}
                        onClick={() => setRoute(`/themes/${theme.name}`)}
                    >
                        {theme.name}
                    </NavLink>
                )}
            </For>
        </SideNav>
    );
};
