import { RouterService } from '@noodlestan/ui-app-router';
import { inject } from '@noodlestan/ui-services';
import { Component, Match, Switch } from 'solid-js';

import { ROUTE_COMPONENTS, ROUTE_THEMES, ROUTE_TOKENS } from './constants';

import { ComponentsPage } from '@/ui/pages/ComponentsPage';
import { HomePage } from '@/ui/pages/HomePage';
import { ThemesPage } from '@/ui/pages/ThemesPage';
import { TokensPage } from '@/ui/pages/TokensPage';

export const AppRoutes: Component = () => {
    const { route } = inject(RouterService);

    return (
        <Switch fallback={<HomePage />}>
            <Match when={route()?.startsWith(ROUTE_COMPONENTS)}>
                <ComponentsPage />
            </Match>
            <Match when={route()?.startsWith(ROUTE_THEMES)}>
                <ThemesPage />
            </Match>
            <Match when={route()?.startsWith(ROUTE_TOKENS)}>
                <TokensPage />
            </Match>
        </Switch>
    );
};
