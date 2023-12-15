import { RouterService } from '@noodlestan/ui-app-router';
import { Text } from '@noodlestan/ui-atoms';
import { inject } from '@noodlestan/ui-services';
import { Component, Show } from 'solid-js';

import { ThemesRoutes } from './ThemesRoutes';
import { ThemesNav } from './components/ThemesNav';

import { DemoPage } from '@/ui/components/DemoPage';
import { PageLayout } from '@/ui/components/PageLayout';
import { ROUTE_THEMES } from '@/ui/routes';

import './ThemesPage.css';

export const ThemesPage: Component = () => {
    const { route } = inject(RouterService);

    const isHome = () => route() === ROUTE_THEMES;

    return (
        <PageLayout classList={{ ThemesPage: true }}>
            <div class="PageLayout--nav">
                <ThemesNav />
            </div>
            <div class="PageLayout--content">
                <Show when={isHome()}>
                    <DemoPage classList={{ 'ThemesPage--home': true }} title="Themes">
                        <Text size="l">
                            Sed tristique lectus dui, vitae viverra sapien semper a. In ut
                            consectetur nibh, eget posuere mauris. Suspendisse hendrerit quam
                            tortor.
                        </Text>
                    </DemoPage>
                </Show>
                <ThemesRoutes />
            </div>
        </PageLayout>
    );
};
