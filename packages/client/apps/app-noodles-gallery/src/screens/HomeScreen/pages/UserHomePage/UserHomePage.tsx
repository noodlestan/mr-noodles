import { inject } from '@noodlestan/ui-services';
import { Component, Show } from 'solid-js';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { AppService } from '@/services/App';

import './UserHomePage.css';

export const UserHomePage: Component = () => {
    const { ready } = inject(AppService);

    return (
        <div class="UserHomePage">
            <Spinner size="l" when={!ready()} />
            <Show when={ready()}>UserHomePage</Show>
        </div>
    );
};
