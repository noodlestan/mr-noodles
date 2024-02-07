import { NavLink } from '@noodlestan/ui-atoms';
import { Component, For } from 'solid-js';

import { SideNav } from '@/app/SideNav';
import { TOKEN_GROUPS } from '@/data/tokens';

import './TokensNav.css';

export const TokensNav: Component = () => {
    return (
        <SideNav classList={{ TokensNav: true }}>
            <For each={TOKEN_GROUPS}>
                {group => (
                    <NavLink href={`/tokens/${group.name.toLowerCase()}`} label={group.name} />
                )}
            </For>
        </SideNav>
    );
};
