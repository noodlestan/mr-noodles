import { RouterService } from '@noodlestan/ui-app-router';
import { Text } from '@noodlestan/ui-atoms';
import { inject } from '@noodlestan/ui-services';
import { Component, Show } from 'solid-js';

import { ComponentsRoutes } from './ComponentsRoutes';
import { ComponentsNav } from './components/ComponentsNav';

import { DemoPage } from '@/ui/components/DemoPage';
import { PageLayout } from '@/ui/components/PageLayout';
import { ROUTE_COMPONENTS } from '@/ui/routes';

import './ComponentsPage.css';

export const ComponentsPage: Component = () => {
    const { route } = inject(RouterService);

    const isHome = () => route() === ROUTE_COMPONENTS;

    return (
        <PageLayout classList={{ ComponentsPage: true }}>
            <div class="PageLayout--nav">
                <ComponentsNav />
            </div>
            <div class="PageLayout--content">
                <Show when={isHome()}>
                    <DemoPage classList={{ 'ComponentsPage--home': true }} title="Components">
                        <Text size="l">
                            Sed tristique lectus dui, vitae viverra sapien semper a. In ut
                            consectetur nibh, eget posuere mauris. Suspendisse hendrerit quam
                            tortor.
                        </Text>
                    </DemoPage>
                </Show>
                <ComponentsRoutes />
            </div>
        </PageLayout>
    );
};
