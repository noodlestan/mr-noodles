import { Display, IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { ArrowLeftIcon } from 'lucide-solid';
import { Component, Show } from 'solid-js';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { AppService } from '@/services/App';

import './SettingsPage.css';

export const SettingsPage: Component = () => {
    const { ready } = inject(AppService);

    return (
        <div class="SettingsPage">
            <Spinner size="l" when={!ready()} />
            <Show when={ready()}>
                <Flex gap="m" padding="l" align="stretch">
                    <Flex direction="row" align="center" justify="between">
                        <Display level={2}>Settings</Display>
                        <IconButton href="/" variant="plain" icon={ArrowLeftIcon} />
                    </Flex>
                    <Surface variant="page">
                        <Flex gap="m" padding="l" align="stretch">
                            Settings
                            {/* Some form
                            <Flex gap="l">
                                <Flex direction="row" gap="m" justify="between">
                                    <Display level={3}>Users</Display>
                                </Flex>
                            </Flex> */}
                        </Flex>
                    </Surface>
                </Flex>
            </Show>
        </div>
    );
};
