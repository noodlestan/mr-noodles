import { Route } from '@solidjs/router';
import { Component, For } from 'solid-js';

import { COMPONENT_PAGE_MAP, THEMES_PAGE_MAP, TOKEN_PAGE_MAP } from './constants';

import { COMPONENTS } from '@/data/components';
import { THEMES } from '@/data/themes';
import { TOKEN_GROUPS } from '@/data/tokens';
import { ComponentsScreen } from '@/screens/ComponentsScreen';
import { ComponentsHomePage } from '@/screens/ComponentsScreen/pages/_ComponentsHomePage/ComponentsHomePage';
import { HomeScreen } from '@/screens/HomeScreen';
import { NotFoundScreen } from '@/screens/NotFoundScreen/NotFoundScreen';
import { ThemesScreen } from '@/screens/ThemesScreen';
import { ThemesHomePage } from '@/screens/ThemesScreen/pages/_ThemesHomePage/ThemesHomePage';
import { TokensScreen } from '@/screens/TokensScreen';
import { TokensHomePage } from '@/screens/TokensScreen/pages/_TokensHomePage/TokensHomePage';

export const Routes: Component = () => {
    return (
        <>
            <Route path="/" component={HomeScreen} />
            <Route path="/components" component={ComponentsScreen}>
                <Route path="/" component={ComponentsHomePage} />
                <For each={COMPONENTS}>
                    {component => {
                        const Comp = COMPONENT_PAGE_MAP[component.name];
                        return <Route path={`/${component.name.toLowerCase()}`} component={Comp} />;
                    }}
                </For>
            </Route>
            <Route path="/themes" component={ThemesScreen}>
                <Route path="/" component={ThemesHomePage} />
                <For each={THEMES}>
                    {theme => {
                        const Comp = THEMES_PAGE_MAP[theme.name];
                        return <Route path={`/${theme.name.toLowerCase()}`} component={Comp} />;
                    }}
                </For>
            </Route>
            <Route path="/tokens" component={TokensScreen}>
                <Route path="/" component={TokensHomePage} />
                <For each={TOKEN_GROUPS}>
                    {group => {
                        const Comp = TOKEN_PAGE_MAP[group.name];
                        return <Route path={`/${group.name.toLowerCase()}`} component={Comp} />;
                    }}
                </For>
            </Route>
            <Route path="*404" component={NotFoundScreen} />
        </>
    );
};
