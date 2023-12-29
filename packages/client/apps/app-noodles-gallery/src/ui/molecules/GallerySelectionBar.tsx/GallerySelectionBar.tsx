import { Button } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Component, createEffect } from 'solid-js';

import { useGallerySelectionContext } from '@/ui/providers/GallerySelection/GallerySelection';

import './GallerySelectionBar.css';

export const GallerySelectionBar: Component = () => {
    const classList = () => ({
        GallerySelectionBar: true,
    });

    const { bus, selection } = useGallerySelectionContext();

    createEffect(() => {
        console.info('GallerySelectionBar:props.Selection', selection());
    });

    const handleClearClick = () => bus?.emit({ name: 'clearSelection' });

    return (
        <Flex classList={classList()} gap="m" align="center">
            Selection: {selection().size}
            <Button variant="plain" size="s" onClick={handleClearClick}>
                Clear
            </Button>
        </Flex>
    );
};
