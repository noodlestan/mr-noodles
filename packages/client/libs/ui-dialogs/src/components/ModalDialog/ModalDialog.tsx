import { Surface } from '@noodlestan/ui-surfaces';
import { Component, JSX } from 'solid-js';

import { useModalsContext } from '../../contexts/Modals/useModalsContext';
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

const Dialog: Component<ModalDialogProps> = props => {
    const size = () => props.size || defaultProps.size;

    const context = useModalsContext();

    const classList = () => ({
        ModalDialog: true,
        [`ModalDialog-size-${size()}`]: true,
    });

    return (
        <Surface variant="dialog" classList={classList()}>
            <div
                role="dialog"
                aria-hidden={!props.show}
                aria-modal="true"
                tabindex="-1"
                classList={classList()}
            >
                <p>id: {context.id}</p>
                <p>transition status: {context.transition()?.status}</p>
                <p>transition name: {context.transition()?.name}</p>
                <p>current: {context.current() ? 'true' : 'false'}</p>
                {props.children}
            </div>
        </Surface>
    );
};

export const ModalDialog: Component<ModalDialogProps> = props => {
    return (
        <Modal show={props.show}>
            <Dialog show={props.show} children={props.children} size={props.size} />
        </Modal>
    );
};
