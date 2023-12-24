import { DialogsService, Modal } from '@noodlestan/ui-dialogs';
import { Component, createRenderEffect, createUniqueId } from 'solid-js';

import { inject } from '@/services/inject';

import './ModalItem.css';

export type ModalItemProps = {
    show: boolean;
};

export const ModalItem: Component<ModalItemProps> = props => {
    const { addDialog, removeDialog, isDialogActive } = inject(DialogsService);

    const id = createUniqueId();

    const classList = () => ({
        ModalItem: true,
    });

    const show = () => isDialogActive(id);

    const dialogClassList = () => ({
        'ModalItem--dialog': true,
        'ModalItem--dialog-is-visible': show(),
    });

    createRenderEffect(() => {
        if (props.show) {
            addDialog(id);
        } else {
            removeDialog(id);
        }
    });

    return (
        <Modal show={props.show} sticky>
            <div classList={classList()}>
                <div
                    role="dialog"
                    aria-hidden={!show()}
                    aria-modal="true"
                    tabindex="-1"
                    classList={dialogClassList()}
                >
                    <img
                        alt=""
                        src="http://localhost:8008/assets/65/80/5b/c402b47f970b423068.thumb.200.jpg"
                    />
                </div>
            </div>
        </Modal>
    );
};
