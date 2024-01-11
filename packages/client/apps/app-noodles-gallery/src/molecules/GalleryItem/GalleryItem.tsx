import type { PhotoData } from '@noodlestan/shared-types';
// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { createIntersectionObserver } from '@solid-primitives/intersection-observer';
import { Component, Show, createEffect, createSignal, on, onMount } from 'solid-js';

import { ItemCheckbox } from '@/atoms/ItemCheckbox/ItemCheckbox';
import { useGalleryNavigationContext } from '@/providers/GalleryNavigation';
import { useGallerySelectionContext } from '@/providers/GallerySelection';
import { makeImageUrl } from '@/services/Images/makeImageUrl';

import './GalleryItem.css';

export type GalleryItemProps = {
    item: PhotoData;
    showCheckbox?: boolean;
};

export const GalleryItem: Component<GalleryItemProps> = props => {
    let buttonRef: HTMLAnchorElement | undefined;

    const [isVisible, setIsVisible] = createSignal<boolean>(false);
    const [isScrolledPast, setIsScrolledPast] = createSignal<boolean>(false);

    const { bus: navigationBus, isModal, current } = useGalleryNavigationContext();
    const { bus: selectionBus } = useGallerySelectionContext();

    const isCurrent = () => current()?.id === props.item.id;

    const handleOnFocus = () => navigationBus?.emit({ name: 'onFocus', target: props.item.id });
    const handleOnClick = (ev?: MouseEvent) => {
        ev?.preventDefault();
        if (current()) {
            navigationBus?.emit({ name: 'onClick', target: props.item.id });
        } else {
            selectionBus?.emit({ name: 'onSelect', target: props.item.id });
        }
    };
    const handleOnSelect = () => selectionBus?.emit({ name: 'onSelect', target: props.item.id });
    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'Space') {
            ev.preventDefault();
            handleOnSelect();
        } else if (ev.code === 'Enter') {
            handleOnClick();
        }
    };

    createEffect(() => {
        if (!isModal() && isCurrent() && buttonRef) {
            buttonRef.focus();
        }
    });

    createEffect(
        on(isModal, (is, was) => {
            if (!is && was && isCurrent() && buttonRef) {
                buttonRef.scrollIntoView({ block: 'center', behavior: 'instant' });
            }
        }),
    );

    const handleObserve: IntersectionObserverCallback = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setIsScrolledPast(false);
                setIsVisible(true);
            } else if (entry.boundingClientRect.top < 0) {
                setIsVisible(false);
                setIsScrolledPast(true);
            } else {
                setIsVisible(false);
            }
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onMount(() => createIntersectionObserver(() => [buttonRef!], handleObserve));

    const imageUrl = () => makeImageUrl('photos', props.item, 'thumb.small');
    const url = () => window.location.pathname;
    // TODO abstract
    const date = () => (props.item.date ? new Date(props.item.date).toString() : '');
    const label = () => `Gallery item. ${date()}. Press to open details.`;

    const classList = () => ({
        GalleryItem: true,
        'GalleryItem-is-current': isCurrent(),
        'GalleryItem-is-visible': isVisible(),
        'GalleryItem-is-scrolled': isScrolledPast(),
    });

    return (
        <Flex gap="m" classList={classList()}>
            <a
                ref={buttonRef}
                href={url()}
                tabindex="0"
                class="GalleryItem--button"
                onFocus={handleOnFocus}
                onClick={handleOnClick}
                onKeyDown={handleKeyDown}
                aria-label={label()}
            >
                <Show when={props.showCheckbox}>
                    <ItemCheckbox
                        id={props.item.id}
                        onFocus={handleOnFocus}
                        onKeyDown={handleKeyDown}
                    />
                </Show>
                <img alt="" src={imageUrl()} />
            </a>
        </Flex>
    );
};
