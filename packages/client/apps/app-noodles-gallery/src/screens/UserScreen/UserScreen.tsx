import { Surface } from '@noodlestan/ui-surfaces';
import { FadeIn } from '@noodlestan/ui-transitions';
import { useBeforeLeave } from '@solidjs/router';
import { Component, onMount } from 'solid-js';

import { UserScreenRoutes } from './UserScreenRoutes';

import { UserBar } from '@/molecules/UserBar/UserBar';
import { ModalView } from '@/organisms/ModalView/ModalView';
import { useCurrentUserContext } from '@/providers/CurrentUser';

import './UserScreen.css';

export const UserScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const { currentUser } = useCurrentUserContext();

    const handleModalClose = () => {
        // navigationBus?.emit({ name: 'closeModal' });
    };

    // const { ready } = inject(AppService);

    onMount(() => window.setTimeout(() => mainRef?.focus()));

    useBeforeLeave(ev => {
        if (!currentUser()) {
            ev.preventDefault();
        }
    });

    // const showBar = () => ready() && !!currentUser();

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <main tabindex="0" class="UserScreen" ref={mainRef}>
            <Surface variant="stage">
                {/* <Show when={showBar()}> */}
                <FadeIn speed="fast">
                    <UserBar />
                </FadeIn>
                {/* </Show> */}
                <UserScreenRoutes />
                <ModalView show={false} onClose={handleModalClose} />
            </Surface>
        </main>
    );
};
