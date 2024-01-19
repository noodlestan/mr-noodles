import type { FileNoodle } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For, Show } from 'solid-js';

import { GalleryItemRow } from '@/molecules/GalleryItemRow/GalleryItemRow';
import { GalleryRowOptions } from '@/organisms/Gallery/types';
import { useGalleryNavigationContext } from '@/providers/GalleryNavigation';

import './GalleryItemRows.css';

export type GalleryItemRowsProps = {
    rows: Accessor<FileNoodle[][]>;
    options: Accessor<GalleryRowOptions>;
};

export const GalleryItemRows: Component<GalleryItemRowsProps> = props => {
    const { bus } = useGalleryNavigationContext();

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'ArrowLeft') {
            bus?.emit({ name: 'goToPreviousItem' });
        }
        if (ev.code === 'ArrowRight') {
            bus?.emit({ name: 'goToNextItem' });
        }
    };

    const classList = () => ({
        GalleryItemRows: true,
    });

    const style = () => {
        return {
            '--gallery-row-height': `${props.options().height}px`,
        };
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div style={style()} onKeyDown={handleKeyDown}>
            <Flex classList={classList()} gap="m" align="start" direction="column">
                <Show when={props.rows}>
                    <For each={props.rows()}>
                        {row => <GalleryItemRow row={() => row} options={props.options} />}
                    </For>
                </Show>
            </Flex>
        </div>
    );
};
