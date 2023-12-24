import { Component, JSX } from 'solid-js';

import { Modal } from '../Modal/Modal';

import './ModalDialog.css';

export type ModalDialogSize = 's' | 'm' | 'l';

export type ModalDialogProps = {
    show: boolean;
    size?: ModalDialogSize;
    children?: JSX.Element;
};

const defaultProps: Pick<ModalDialogProps, 'size'> = {
    size: 'm',
};

export const ModalDialog: Component<ModalDialogProps> = props => {
    const size = () => props.size || defaultProps.size;

    const classList = () => ({
        ModalDialog: true,
        [`ModalDialog-size-${size()}`]: true,
    });

    return (
        <Modal show={props.show}>
            <div
                role="dialog"
                aria-hidden={!props.show}
                aria-modal="true"
                tabindex="-1"
                classList={classList()}
            >
                {props.children}
            </div>
        </Modal>
    );
};
