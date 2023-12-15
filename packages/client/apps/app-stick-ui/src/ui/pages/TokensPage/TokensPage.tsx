import { RouterService } from '@noodlestan/ui-app-router';
import { Text } from '@noodlestan/ui-atoms';
import { inject } from '@noodlestan/ui-services';
import { Component, Show } from 'solid-js';

import { TokensRoutes } from './TokensRoutes';
import { TokensNav } from './components/TokensNav';

import { DemoPage } from '@/ui/components/DemoPage';
import { PageLayout } from '@/ui/components/PageLayout';
import { ROUTE_TOKENS } from '@/ui/routes';

import './TokensPage.css';

export const TokensPage: Component = () => {
    const { route } = inject(RouterService);

    const isHome = () => route() === ROUTE_TOKENS;
    return (
        <PageLayout classList={{ TokensPage: true }}>
            <div class="PageLayout--nav">
                <TokensNav />
            </div>
            <div class="PageLayout--content">
                <Show when={isHome()}>
                    <DemoPage classList={{ 'TokensPage--home': true }} title="Tokens">
                        <Text size="l">
                            Sed tristique lectus dui, vitae viverra sapien semper a. In ut
                            consectetur nibh, eget posuere mauris. Suspendisse hendrerit quam
                            tortor.
                        </Text>
                    </DemoPage>
                </Show>
                <TokensRoutes />
            </div>
        </PageLayout>
    );
};
