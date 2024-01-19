import type { FolderNoodle } from '@noodlestan/shared-types';
import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For, Show } from 'solid-js';

import { FolderCard } from '@/molecules/FolderCard/FolderCard';
import { useFoldersNavigationContext } from '@/providers/FoldersNavigation';

import './Folders.css';

export type FoldersProps = {
    items?: Accessor<FolderNoodle[]>;
};

export const Folders: Component<FoldersProps> = props => {
    const { bus } = useFoldersNavigationContext();

    const items = () => props.items?.();

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'ArrowLeft') {
            bus?.emit({ name: 'goToPreviousItem' });
        }
        if (ev.code === 'ArrowRight') {
            bus?.emit({ name: 'goToNextItem' });
        }
    };

    const classList = () => ({
        Folders: true,
    });

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onKeyDown={handleKeyDown}>
            <Show when={items()?.length}>
                <Flex classList={classList()} gap="m" wrap direction="column">
                    <Display level={4}>{items()?.length} Subfolders</Display>
                    <Flex gap="m" wrap direction="row">
                        <For each={items()}>{item => <FolderCard item={item} />}</For>
                    </Flex>
                </Flex>
            </Show>
        </div>
    );
};
