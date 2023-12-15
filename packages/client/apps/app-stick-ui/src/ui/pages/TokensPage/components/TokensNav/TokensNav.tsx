import { RouterService } from '@noodlestan/ui-app-router';
import { NavLink } from '@noodlestan/ui-atoms';
import { inject } from '@noodlestan/ui-services';
import { Component, For } from 'solid-js';

import { TOKEN_GROUPS } from '@/data/tokens';
import { SideNav } from '@/ui/app/SideNav';

import './TokensNav.css';

export const TokensNav: Component = () => {
    const { route, setRoute } = inject(RouterService);

    return (
        <SideNav classList={{ TokensNav: true }}>
            <For each={TOKEN_GROUPS}>
                {group => (
                    <NavLink
                        active={route() === `/tokens/${group}`}
                        onClick={() => setRoute(`/tokens/${group}`)}
                    >
                        {group}
                    </NavLink>
                )}
            </For>
        </SideNav>
    );
};
