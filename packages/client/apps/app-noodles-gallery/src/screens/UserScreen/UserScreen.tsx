import { FadeIn } from '@noodlestan/ui-transitions';
import { Component, JSX, onMount } from 'solid-js';

import { UserBar } from '@/molecules/UserBar/UserBar';
import { ModalView } from '@/organisms/ModalView/ModalView';

import './UserScreen.css';

type UserScreenProps = {
    children?: JSX.Element;
};

export const UserScreen: Component<UserScreenProps> = props => {
    let mainRef: HTMLDivElement | undefined;

    const handleModalClose = () => {
        // navigationBus?.emit({ name: 'closeModal' });
    };

    // const { ready } = inject(AppService);

    onMount(() => window.setTimeout(() => mainRef?.focus()));

    // const showBar = () => ready() && !!currentUser();

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <main tabindex="0" class="UserScreen" ref={mainRef}>
            <FadeIn speed="fast">
                <UserBar />
            </FadeIn>
            {props.children}
            <ModalView show={false} onClose={handleModalClose} />
        </main>
    );
};
