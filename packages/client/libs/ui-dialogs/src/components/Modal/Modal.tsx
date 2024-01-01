/* eslint-disable jsx-a11y/no-autofocus */
import { inject } from '@noodlestan/ui-services';
import { Component, JSX, Show, createUniqueId, untrack } from 'solid-js';
import { Portal } from 'solid-js/web';

import { useModalShowEffect, useTransitionClassList } from '../../hooks/';
import { MODAL_Z_INDEX } from '../../private/constants';
import { ModalProvider } from '../../private/providers/ModalProvider';
import { ModalsService } from '../../services';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../Overlay';

import './Modal.css';

export type ModalProps = {
    show: boolean;
    sticky?: boolean;
    children?: JSX.Element;
};

export const Modal: Component<ModalProps> = props => {
    const { getModalIndex, getModalTransition, isModalCurrent, isModalDimmed, isModalVisible } =
        inject(ModalsService);

    const id = createUniqueId();

    const getIndex = () => getModalIndex(id);
    const isCurrent = () => isModalCurrent(id);
    const getTransition = () => getModalTransition(id);
    const isTransition = () => !!getTransition();
    const isVisible = () => isModalVisible(id) || !!isTransition();

    const classList = () => ({ Modal: true, 'Modal-is-current': isCurrent() });
    const transitionClassList = useTransitionClassList('Modal', getTransition);

    const options = untrack(() => ({ sticky: !!props.sticky }));
    useModalShowEffect(() => props.show, id, options);

    return (
        <Show when={isVisible()}>
            <Portal>
                <div classList={classList()} style={{ 'z-index': getIndex() + MODAL_Z_INDEX }}>
                    <ModalProvider
                        id={id}
                        options={options}
                        current={isCurrent}
                        transition={getTransition}
                    >
                        <FocusTrap show={isModalVisible(id) && !isTransition()} autoFocus={true}>
                            <div classList={transitionClassList()}>{props.children}</div>
                        </FocusTrap>
                        <Show when={isModalDimmed(id)}>
                            <Overlay />
                        </Show>
                    </ModalProvider>
                </div>
            </Portal>
        </Show>
    );
};
