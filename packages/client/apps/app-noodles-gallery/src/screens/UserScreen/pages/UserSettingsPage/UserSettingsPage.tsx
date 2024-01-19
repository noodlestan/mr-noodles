import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, Show } from 'solid-js';

import { UserSettingsRoots } from './private/UserSettingsRoots';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { AppService } from '@/services/App';

import './UserSettingsPage.css';

export const UserSettingsPage: Component = () => {
    const { ready } = inject(AppService);

    return (
        <div class="UserSettingsPage">
            <Spinner size="l" when={!ready()} />
            <Show when={ready()}>
                <Flex gap="m" padding="l" align="stretch">
                    <Display level={2}>Settings</Display>
                    <Surface variant="page">
                        <Flex gap="m" padding="l" align="stretch">
                            <UserSettingsRoots />
                        </Flex>
                    </Surface>
                </Flex>
            </Show>
        </div>
    );
};
