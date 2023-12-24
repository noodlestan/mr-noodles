import { Component, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

import { dialogsStore } from '../../private/stores/dialogs';

import './ModalOverlay.css';

export const ModalOverlay: Component = () => {
    const { dialogs } = dialogsStore;

    return (
        <Show when={dialogs().length}>
            <Portal>
                <div class="ModalOverlay" />
            </Portal>
        </Show>
    );
};
