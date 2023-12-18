import { RouterService } from '@noodlestan/ui-app-router';
import { inject } from '@noodlestan/ui-services';
import { Component, JSX, Show } from 'solid-js';

import { THEME_PAGE_MAP } from './pages';

import { THEMES } from '@/data/themes';

export const ThemesRoutes: Component = () => {
    const { route } = inject(RouterService);

    const component = (): JSX.Element => {
        const name = route()?.split('/')[2];
        const comp = THEMES.find(c => c.name === name);
        const Comp = comp && THEME_PAGE_MAP[comp.name];
        return (
            <Show when={Comp}>
                <Comp />
            </Show>
        );
    };

    return <>{component()}</>;
};
