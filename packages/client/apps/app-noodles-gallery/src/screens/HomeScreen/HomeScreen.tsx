import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, JSX, Show, onMount } from 'solid-js';

import { HomeBar } from '@/molecules/HomeBar/HomeBar';
import { ModalView } from '@/organisms/ModalView/ModalView';
import { AppService } from '@/services/App';

import './HomeScreen.css';

type HomeScreenProps = {
    children?: JSX.Element;
};

export const HomeScreen: Component<HomeScreenProps> = props => {
    let mainRef: HTMLDivElement | undefined;

    const handleModalClose = () => {
        // navigationBus?.emit({ name: 'closeModal' });
    };

    const { ready } = inject(AppService);

    onMount(() => window.setTimeout(() => mainRef?.focus()));

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <main tabindex="0" class="HomeScreen" ref={mainRef}>
            <Show when={ready()}>
                {props.children}
                <HomeBar />
            </Show>
            <ModalView show={false} onClose={handleModalClose} />
        </main>
    );
};
