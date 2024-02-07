import { NavLink } from '@noodlestan/ui-atoms';
import { Component, For } from 'solid-js';

import { SideNav } from '@/app/SideNav';
import { THEMES } from '@/data/themes';

import './ThemesNav.css';

export const ThemesNav: Component = () => {
    return (
        <SideNav classList={{ ThemesNav: true }}>
            <For each={THEMES}>
                {theme => (
                    <NavLink href={`/themes/${theme.name}`} label={theme.name.toLowerCase()} />
                )}
            </For>
        </SideNav>
    );
};
