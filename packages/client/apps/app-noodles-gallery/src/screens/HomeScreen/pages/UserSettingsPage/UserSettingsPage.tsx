import { inject } from '@noodlestan/ui-services';
import { Component, Show } from 'solid-js';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { AppService } from '@/services/App';

import './UserSettingsPage.css';

export const UserSettingsPage: Component = () => {
    const { ready } = inject(AppService);

    return (
        <div class="UserSettingsPage">
            <Spinner size="l" when={!ready()} />
            <Show when={ready()}>UserSettingsPage</Show>
        </div>
    );
};
