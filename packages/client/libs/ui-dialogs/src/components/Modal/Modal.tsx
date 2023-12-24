import { Component, JSX, Show, createRenderEffect, createUniqueId } from 'solid-js';
import { Portal } from 'solid-js/web';

import { dialogsStore } from '../../private/stores/dialogs';

import './Modal.css';

export type ModalProps = {
    show: boolean;
    sticky?: boolean;
    children?: JSX.Element;
};

export const Modal: Component<ModalProps> = props => {
    const { addDialog, removeDialog, isDialogOpen, isDialogActive } = dialogsStore;

    const id = createUniqueId();

    const show = () => (props.sticky ? isDialogOpen(id) : isDialogActive(id));

    const dim = () => props.sticky && !isDialogActive(id);

    const classList = () => ({
        Modal: true,
        'Modal-is-dimmed': dim(),
    });

    createRenderEffect(() => {
        if (props.show) {
            addDialog(id);
        } else {
            removeDialog(id);
        }
    });

    return (
        <Show when={props.show}>
            <Portal>
                <Show when={show()}>
                    <div classList={classList()}>{props.children}</div>
                    <Show when={dim()}>
                        <div class="Modal--dim" />
                    </Show>
                </Show>
            </Portal>
        </Show>
    );
};
