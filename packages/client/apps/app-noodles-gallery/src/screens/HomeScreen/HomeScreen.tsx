import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { useBeforeLeave } from '@solidjs/router';
import { Component, Show, onMount } from 'solid-js';

import { HomeScreenRoutes } from './HomeScreenRoutes';

import { HomeBar } from '@/molecules/HomeBar/HomeBar';
import { ModalView } from '@/organisms/ModalView/ModalView';
import { useCurrentUserContext } from '@/providers/CurrentUser';
import { AppService } from '@/services/App';

import './HomeScreen.css';

export const HomeScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const { currentUser } = useCurrentUserContext();

    const handleModalClose = () => {
        // navigationBus?.emit({ name: 'closeModal' });
    };

    const { ready } = inject(AppService);

    onMount(() => window.setTimeout(() => mainRef?.focus()));

    useBeforeLeave(ev => {
        if (!currentUser()) {
            ev.preventDefault();
        }
    });

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <main tabindex="0" class="HomeScreen" ref={mainRef}>
            <Surface variant="stage">
                <Show when={ready()}>
                    <HomeScreenRoutes />
                    <HomeBar />
                </Show>
                <ModalView show={false} onClose={handleModalClose} />
            </Surface>
        </main>
    );
};
