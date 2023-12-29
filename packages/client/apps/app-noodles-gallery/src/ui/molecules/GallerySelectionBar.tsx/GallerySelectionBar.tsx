import { Flex } from '@noodlestan/ui-layouts';
import { Component, createEffect } from 'solid-js';

import { useGallerySelectionContext } from '@/ui/providers/GallerySelection/GallerySelection';

import './GallerySelectionBar.css';

export const GallerySelectionBar: Component = () => {
    const classList = () => ({
        GallerySelectionBar: true,
    });

    const { selection } = useGallerySelectionContext();

    createEffect(() => {
        console.info('GallerySelectionBar:props.Selection', selection());
    });

    return (
        <Flex classList={classList()} gap="m" align="center">
            Selection: {Object.values(selection()).length}
        </Flex>
    );
};
