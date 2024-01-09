import { IconButton, Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { CircleOff } from 'lucide-solid';
import { Component, Show, createEffect } from 'solid-js';

import { useGallerySelectionContext } from '@/providers/GallerySelection';

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
            <Show when={selection().size}>
                <Text size="m">{selection().size} selected</Text>
                <IconButton
                    variant="plain"
                    size="s"
                    onClick={handleClearClick}
                    icon={CircleOff}
                    label="Clear selection"
                />
            </Show>
        </Flex>
    );
};
