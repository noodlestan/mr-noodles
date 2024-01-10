/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { PhotoData } from '@noodlestan/shared-types';
import { Modal } from '@noodlestan/ui-dialogs';
import { Component, createSignal } from 'solid-js';

import { ModalItem } from '@/molecules/ModalItem/ModalItem';
import { ModalItemHeader } from '@/molecules/ModalItemHeader/ModalItemHeader';
import { ModalItemNavigation } from '@/molecules/ModalItemNavigation/ModalItemNavigation';
import { ModalItemRail } from '@/molecules/ModalItemRail/ModalItemRail';
import { useGalleryNavigationContext } from '@/providers/GalleryNavigation';

import './ModalView.css';

const SHOW_HEADER_DURATION_INITIAL = 1000;
const SHOW_HEADER_DURATION_SUBSQUENT = 3000;

export type ModalViewProps = {
    show: boolean;
};

const ModalViewContents: Component<ModalViewProps> = () => {
    const [quiet, setQuiet] = createSignal<boolean>(false);
    const [quietTimeoutId, setQuietTimeoutId] = createSignal<number>(0);

    const classList = () => ({
        ModalView: true,
        'ModalView-is-quiet': true,
    });

    const dialogClassList = () => ({
        'ModalView--dialog': true,
    });

    const resetQuiet = (time = SHOW_HEADER_DURATION_INITIAL) => {
        clearTimeout(quietTimeoutId());
        setQuietTimeoutId(setTimeout(() => setQuiet(true), time));
    };

    const { bus, current } = useGalleryNavigationContext();
    const item = () => current() as PhotoData;

    // const previousId = () => previous() || '';
    // const nextId = () => next() || '';
    // createEffect(
    //     on(current, (value, previous) => {
    //         // TODO animate transition
    //         // console.info(previousId(), id(), nextId());
    //     }),
    // );

    const notQuiet = () => {
        resetQuiet(SHOW_HEADER_DURATION_SUBSQUENT);
        setQuiet(false);
    };

    const handleMouseMove = notQuiet;

    // eslint-disable-next-line solid/reactivity
    resetQuiet();

    const handleClick = () => {
        clearTimeout(quietTimeoutId());
        setQuiet(true);
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
        notQuiet();
        if (ev.code === 'ArrowLeft') {
            bus?.emit({ name: 'goToPreviousItem' });
        }
        if (ev.code === 'ArrowRight') {
            bus?.emit({ name: 'goToNextItem' });
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div classList={classList()} onKeyDown={handleKeyDown}>
            <div
                role="dialog"
                aria-hidden={false}
                aria-modal="true"
                tabindex="-1"
                classList={dialogClassList()}
                onMouseMove={handleMouseMove}
                onKeyDown={handleKeyDown}
            >
                <ModalItemHeader item={item()} show={!quiet()} />
                <ModalItemRail>
                    {/* <ModalItem id={previousId()} /> */}
                    <ModalItem item={item()} onClick={handleClick} />
                    {/* <ModalItem id={nextId()} /> */}
                </ModalItemRail>
                <ModalItemNavigation show={!quiet()} />
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
