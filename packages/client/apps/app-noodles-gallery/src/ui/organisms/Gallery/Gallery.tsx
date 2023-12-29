import type { IGroup, PhotoData, PhotoQuery } from '@noodlestan/shared-types';
import { ModalDialog } from '@noodlestan/ui-dialogs';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For, Show, createSignal, onCleanup, onMount } from 'solid-js';

import { createGalleryGroups } from './private/createGalleryGroups';
import { GalleryOptions } from './types';

import { GalleryGroupSurface } from '@/ui/molecules/GalleryGroupSurface/GalleryGroupSurface';

import './Gallery.css';

export type GalleryProps = {
    groupBy: Accessor<IGroup[]>;
    query?: Accessor<PhotoQuery>;
    items?: Accessor<PhotoData[]>;
};

export const Gallery: Component<GalleryProps> = props => {
    const classList = () => ({
        Gallery: true,
    });

    const [rect, setRect] = createSignal({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    const handler = () => {
        setRect({ height: window.innerHeight, width: window.innerWidth });
    };

    onMount(() => {
        window.addEventListener('resize', handler);
    });

    onCleanup(() => {
        window.removeEventListener('resize', handler);
    });

    const options = (): GalleryOptions => {
        return {
            rows: {
                height: 200,
                maxItems: 6,
                maxWidth: rect().width - 100,
            },
            groupBy: props.groupBy(),
        };
    };

    const groups = () => {
        return createGalleryGroups(props.items?.(), options());
    };

    const [modal1, setModal1] = createSignal<boolean>(false);
    const [modal2, setModal2] = createSignal<boolean>(false);

    return (
        <Flex classList={classList()} gap="m">
            <ModalDialog show={modal1()} size="l">
                foo
                <button onClick={() => setModal1(false)}>close</button>
            </ModalDialog>
            <ModalDialog show={modal2()} size="s">
                bar
                <button onClick={() => setModal2(false)}>close</button>
            </ModalDialog>
            <button onClick={() => setModal1(true)}>foo</button>
            <button onClick={() => setModal2(true)}>bar</button>
            <Show when={groups()}>
                <For each={groups()}>
                    {group => <GalleryGroupSurface group={() => group} options={options} />}
                </For>
            </Show>
        </Flex>
    );
};
