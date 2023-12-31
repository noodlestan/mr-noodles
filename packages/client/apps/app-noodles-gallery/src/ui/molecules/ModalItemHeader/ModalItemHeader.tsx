import { PhotoData } from '@noodlestan/shared-types';
import { Display, IconButton } from '@noodlestan/ui-atoms';
import { X } from 'lucide-solid';
import { Component } from 'solid-js';

import { GallerySelectionBar } from '../GallerySelectionBar.tsx/GallerySelectionBar';

import { useGalleryNavigationContext } from '@/ui/providers/GalleryNavigation';

import './ModalItemHeader.css';

export type ModalItemHeaderProps = {
    item: PhotoData;
    show: boolean;
};

export const ModalItemHeader: Component<ModalItemHeaderProps> = props => {
    const { bus } = useGalleryNavigationContext();

    const handleCloseClick = () => bus?.emit({ name: 'closeModal' });

    // TODO abstract
    // const date = () => (props.item.date ? new Date(props.item.date).toString() : '');
    const name = () => props.item.filename;

    const classList = () => ({
        ModalItemHeader: true,
        'ModalItemHeader-is-active': props.show,
    });

    return (
        <div classList={classList()}>
            <Display level={4}> size="m"{name()}</Display>
            <GallerySelectionBar />
            <IconButton variant="plain" size="s" onClick={handleCloseClick} icon={X} />
        </div>
    );
};
