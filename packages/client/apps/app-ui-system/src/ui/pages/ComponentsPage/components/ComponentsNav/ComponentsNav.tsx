import { RouterService } from '@noodlestan/ui-app-router';
import { NavLink } from '@noodlestan/ui-atoms';
import { inject } from '@noodlestan/ui-services';
import { Component, For } from 'solid-js';

import { COMPONENTS } from '@/data/components';
import { SideNav } from '@/ui/app/SideNav';

import './ComponentsNav.css';

export const ComponentsNav: Component = () => {
    const { route, setRoute } = inject(RouterService);

    return (
        <SideNav classList={{ ComponentsNav: true }}>
            <For each={COMPONENTS}>
                {c => (
                    <NavLink
                        size="s"
                        active={route() === `/components/${c.name}`}
                        onClick={() => setRoute(`/components/${c.name}`)}
                    >
                        {c.name}
                    </NavLink>
                )}
            </For>
        </SideNav>
    );
};
