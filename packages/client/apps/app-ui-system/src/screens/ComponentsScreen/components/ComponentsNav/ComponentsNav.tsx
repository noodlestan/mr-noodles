import { NavLink } from '@noodlestan/ui-atoms';
import { Component, For } from 'solid-js';

import { SideNav } from '@/app/SideNav';
import { COMPONENTS } from '@/data/components';

import './ComponentsNav.css';

export const ComponentsNav: Component = () => {
    return (
        <SideNav classList={{ ComponentsNav: true }}>
            <For each={COMPONENTS}>
                {c => (
                    <NavLink size="s" href={`/components/${c.name.toLowerCase()}`} label={c.name} />
                )}
            </For>
        </SideNav>
    );
};
