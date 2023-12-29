import { Button } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { useGallerySelectionContext } from '@/ui/providers/GallerySelection/GallerySelection';

import './ModalItemHeader.css';
export type ModalItemHeaderProps = {
    show: boolean;
};

export const ModalItemHeader: Component<ModalItemHeaderProps> = props => {
    const classList = () => ({
        ModalItemHeader: true,
        'ModalItemHeader-is-active': props.show,
    });

    const { bus } = useGallerySelectionContext();

    const handleCloseClick = () => {
        bus?.emit({ name: 'closeModal' });
    };

    return (
        <div classList={classList()}>
            <Button variant="plain" onClick={handleCloseClick}>
                X
            </Button>
        </div>
    );
};
