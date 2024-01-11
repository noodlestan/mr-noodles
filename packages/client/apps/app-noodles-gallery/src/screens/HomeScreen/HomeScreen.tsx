import { Display } from '@noodlestan/ui-atoms';
import { NutIcon } from 'lucide-solid';
import { Component, onMount } from 'solid-js';

import { ModalView } from '@/organisms/ModalView/ModalView';

import './HomeScreen.css';

export const HomeScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const handleModalClose = () => {
        // navigationBus?.emit({ name: 'closeModal' });
    };

    onMount(() => window.setTimeout(() => mainRef?.focus()));

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <main tabindex="0" class="HomeScreen" ref={mainRef}>
            <Display>
                <NutIcon /> Welcome
            </Display>
            <ModalView show={false} onClose={handleModalClose} />
        </main>
    );
};
