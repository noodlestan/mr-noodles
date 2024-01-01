import { IconButton } from '@noodlestan/ui-atoms';
import { ArrowLeft, ArrowRight } from 'lucide-solid';
import { Component, Show } from 'solid-js';

import { useGallerySelectionContext } from '@/ui/providers/GallerySelection/GallerySelection';

import './ModalItemNavigation.css';

export type ModalItemNavigationProps = {
    show: boolean;
};

export const ModalItemNavigation: Component<ModalItemNavigationProps> = props => {
    const { bus, previous, next } = useGallerySelectionContext();

    const handlePreviousClick = () => {
        bus?.emit({ name: 'goToPreviousItem' });
    };

    const handleNextClick = () => {
        bus?.emit({ name: 'goToNextItem' });
    };

    const classList = () => ({
        ModalItemNavigation: true,
        'ModalItemNavigation-is-active': props.show,
    });

    return (
        <div classList={classList()}>
            <Show when={previous()}>
                <IconButton
                    variant="plain"
                    onClick={handlePreviousClick}
                    icon={ArrowLeft}
                    classList={{ 'ModalItemNavigation-previous': true }}
                />
            </Show>
            <Show when={next()}>
                <IconButton
                    variant="plain"
                    onClick={handleNextClick}
                    classList={{ 'ModalItemNavigation-next': true }}
                    icon={ArrowRight}
                />
            </Show>
        </div>
    );
};
