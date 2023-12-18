import { RouterService } from '@noodlestan/ui-app-router';
import { inject } from '@noodlestan/ui-services';
import { Component, JSX, Show } from 'solid-js';

import { TOKEN_PAGE_MAP } from './pages';

import { TOKEN_GROUPS } from '@/data/tokens';

export const TokensRoutes: Component = () => {
    const { route } = inject(RouterService);

    const component = (): JSX.Element => {
        const name = route()?.split('/')[2] || '';
        const comp = TOKEN_GROUPS.indexOf(name) !== -1;
        const Comp = comp && TOKEN_PAGE_MAP[name];
        return (
            <Show when={Comp}>
                <Comp />
            </Show>
        );
    };

    return <>{component()}</>;
};
