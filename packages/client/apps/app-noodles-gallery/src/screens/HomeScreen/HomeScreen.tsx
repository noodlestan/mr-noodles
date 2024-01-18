import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { FadeIn } from '@noodlestan/ui-transitions';
import { Squeeze } from '@noodlestan/ui-transitions/src/components/Squeeze';
import { useBeforeLeave } from '@solidjs/router';
import { Component, Show, onMount } from 'solid-js';

import { HomeScreenRoutes } from './HomeScreenRoutes';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';

import { UserBar } from '@/molecules/UserBar/UserBar';
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

    const showBar = () => ready() && !!currentUser();

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <main tabindex="0" class="HomeScreen" ref={mainRef}>
            <Surface variant="stage">
                <Squeeze when={!!currentUser()} delay={100}>
                    <WelcomePage />
                </Squeeze>
                <FadeIn when={showBar()}>
                    <UserBar />
                </FadeIn>
                <Show when={!!currentUser()}>
                    <HomeScreenRoutes />
                </Show>
                <ModalView show={false} onClose={handleModalClose} />
            </Surface>
        </main>
    );
};
