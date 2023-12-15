import { RouterService } from '@noodlestan/ui-app-router';
import { inject } from '@noodlestan/ui-services';
import { Component, JSX, Show } from 'solid-js';

import { COMPONENT_PAGE_MAP } from './pages';

import { COMPONENTS } from '@/data/components';

export const ComponentsRoutes: Component = () => {
    const { route } = inject(RouterService);

    const component = (): JSX.Element => {
        const name = route()?.split('/')[2];
        const comp = COMPONENTS.find(c => c.name === name);
        const Comp = comp && COMPONENT_PAGE_MAP[comp.name];
        return (
            <Show when={Comp}>
                <Comp />
            </Show>
        );
    };

    return <>{component()}</>;
};
