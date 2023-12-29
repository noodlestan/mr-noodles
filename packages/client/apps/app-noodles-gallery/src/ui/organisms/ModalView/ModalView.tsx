import { Modal } from '@noodlestan/ui-dialogs';
import { Component, createEffect, on } from 'solid-js';

import { ModalItem } from '@/ui/organisms//ModalItem/ModalItem';
import { ModalItemRail } from '@/ui/organisms/ModalItemRail/ModalItemRail';
import { useGallerySelectionContext } from '@/ui/providers/GallerySelection/GallerySelection';

import './ModalView.css';

export type ModalViewProps = {
    show: boolean;
};

const ModalViewContents: Component<ModalViewProps> = () => {
    const classList = () => ({
        ModalView: true,
    });

    const dialogClassList = () => ({
        'ModalView--dialog': true,
    });

    const { previous, current, next } = useGallerySelectionContext();

    const previousId = () => previous() || '';
    const id = () => current() || '';
    const nextId = () => next() || '';

    createEffect(
        on(current, (value, previous) => {
            // TODO animate transition
            console.info(previousId(), id(), nextId());
            console.info(value, previous);
        }),
    );

    return (
        <div classList={classList()}>
            <div
                role="dialog"
                aria-hidden={false}
                aria-modal="true"
                tabindex="-1"
                classList={dialogClassList()}
            >
                <ModalItemRail>
                    {/* <ModalItem id={previousId()} /> */}
                    <ModalItem id={id()} />
                    {/* <ModalItem id={nextId()} /> */}
                </ModalItemRail>
            </div>
        </div>
    );
};

export const ModalView: Component<ModalViewProps> = props => {
    return (
        <Modal show={props.show} sticky>
            <ModalViewContents {...props} />
        </Modal>
    );
};
