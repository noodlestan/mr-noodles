import { inject } from '@noodlestan/ui-services';
import { Component, Show } from 'solid-js';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { AppService } from '@/services/App';

import './UserFavoritesPage.css';

export const UserFavoritesPage: Component = () => {
    const { ready } = inject(AppService);

    return (
        <div class="UserFavoritesPage">
            <Spinner size="l" when={!ready()} />
            <Show when={ready()}>UserFavoritesPage</Show>
        </div>
    );
};
