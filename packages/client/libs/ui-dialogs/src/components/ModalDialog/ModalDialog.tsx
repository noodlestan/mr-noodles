import { Surface } from '@noodlestan/ui-surfaces';
import { Component, JSX } from 'solid-js';

import { Modal } from '../Modal/Modal';

import './ModalDialog.css';

export type ModalDialogSize = 's' | 'm' | 'l';

export type ModalDialogProps = {
    show: boolean;
    size?: ModalDialogSize;
    children?: JSX.Element;
    onClose: () => void;
};

const defaultProps: Pick<ModalDialogProps, 'size'> = {
    size: 'm',
};

const Dialog: Component<Omit<ModalDialogProps, 'onClose'>> = props => {
    const size = () => props.size || defaultProps.size;

    const classList = () => ({
        ModalDialog: true,
        [`ModalDialog-size-${size()}`]: true,
    });

    return (
        <Surface variant="dialog" classList={classList()}>
            <div role="dialog" aria-hidden={!props.show} aria-modal="true" tabindex="-1">
                {props.children}
            </div>
        </Surface>
    );
};

export const ModalDialog: Component<ModalDialogProps> = props => {
    return (
        <Modal show={props.show} onClose={props.onClose}>
            <Dialog show={props.show} children={props.children} size={props.size} />
        </Modal>
    );
};
