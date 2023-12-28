import { Modal } from '@noodlestan/ui-dialogs';
import { Component } from 'solid-js';

import './ModalItem.css';

export type ModalItemProps = {
    show: boolean;
};

const ModalItemContents: Component<ModalItemProps> = () => {
    const classList = () => ({
        ModalItem: true,
    });

    const dialogClassList = () => ({
        'ModalItem--dialog': true,
    });

    return (
        <div classList={classList()}>
            <div
                role="dialog"
                aria-hidden={false}
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
    );
};

export const ModalItem: Component<ModalItemProps> = props => {
    return (
        <Modal show={props.show} sticky>
            <ModalItemContents {...props} />
        </Modal>
    );
};
