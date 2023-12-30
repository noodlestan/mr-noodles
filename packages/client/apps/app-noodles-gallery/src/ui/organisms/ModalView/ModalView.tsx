import { PhotoData } from '@noodlestan/shared-types';
import { Modal } from '@noodlestan/ui-dialogs';
import { Component, createSignal } from 'solid-js';

import { ModalItem } from '@/ui/molecules/ModalItem/ModalItem';
import { ModalItemHeader } from '@/ui/molecules/ModalItemHeader/ModalItemHeader';
import { ModalItemRail } from '@/ui/molecules/ModalItemRail/ModalItemRail';
import { useGallerySelectionContext } from '@/ui/providers/GallerySelection/GallerySelection';

import './ModalView.css';

const SHOW_HEADER_DURATION_INITIAL = 500;
const SHOW_HEADER_DURATION_SUBSQUENT = 2500;

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

    const { current } = useGallerySelectionContext();
    // const previousId = () => previous() || '';
    const item = () => current() as PhotoData;
    // const nextId = () => next() || '';

    // createEffect(
    //     on(current, (value, previous) => {
    //         // TODO animate transition
    //         // console.info(previousId(), id(), nextId());
    //     }),
    // );

    const handleMouseMove = () => {
        resetQuiet(SHOW_HEADER_DURATION_SUBSQUENT);
        setQuiet(false);
    };

    // eslint-disable-next-line solid/reactivity
    resetQuiet();

    const handleClick = () => {
        clearTimeout(quietTimeoutId());
        setQuiet(true);
    };

    return (
        <div classList={classList()}>
            <div
                role="dialog"
                aria-hidden={false}
                aria-modal="true"
                tabindex="-1"
                classList={dialogClassList()}
                onMouseMove={handleMouseMove}
            >
                <ModalItemHeader show={!quiet()} />
                <ModalItemRail>
                    {/* <ModalItem id={previousId()} /> */}
                    <ModalItem item={item()} onClick={handleClick} />
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
