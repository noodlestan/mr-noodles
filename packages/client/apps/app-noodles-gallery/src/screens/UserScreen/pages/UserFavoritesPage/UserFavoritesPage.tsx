import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, Show } from 'solid-js';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { PageLayout } from '@/molecules/PageLayout/PageLayout';
import { AppService } from '@/services/App';

import './UserFavoritesPage.css';

export const UserFavoritesPage: Component = () => {
    const { ready } = inject(AppService);

    return (
        <PageLayout classList={{ UserFavoritesPage: true }}>
            <Spinner size="l" when={!ready()} />
            <Show when={ready()}>
                <Flex gap="m" padding="l" align="stretch">
                    <Display level={2}>Favorites</Display>
                    <Surface variant="page">
                        <Flex gap="m" padding="l" align="stretch">
                            ...
                        </Flex>
                    </Surface>
                </Flex>
            </Show>
        </PageLayout>
    );
};
