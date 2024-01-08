import type { AlbumData } from '@noodlestan/shared-types';
// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, Show, createEffect } from 'solid-js';

import { BreadcrumbFolderIcon } from '@/ui/atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';
import { AlbumTitle } from '@/ui/molecules/AlbumTitle/AlbumTitle';
import { useAlbumsNavigationContext } from '@/ui/providers/AlbumsNavigation';
import { makeImageUrl } from '@/ui/services/Images/makeImageUrl';

import './AlbumItem.css';

export type AlbumItemProps = {
    item: AlbumData;
};

export const AlbumItem: Component<AlbumItemProps> = props => {
    let buttonRef: HTMLAnchorElement | undefined;

    const { bus, current, isModal } = useAlbumsNavigationContext();

    const isCurrent = () => current()?.id === props.item.id;

    const handleOnFocus = () => bus?.emit({ name: 'onFocus', target: props.item.id });
    const handleOnClick = () => {
        bus?.emit({ name: 'onClick', target: props.item.id });
    };
    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'Space') {
            ev.preventDefault();
        } else if (ev.code === 'Enter') {
            handleOnClick();
        }
    };

    createEffect(() => {
        if (!isModal() && isCurrent() && buttonRef) {
            buttonRef.focus();
            buttonRef.scrollIntoView({ block: 'center', behavior: 'instant' });
            // TODO set focus when modal closes
        }
    });

    const url = () => `/albums/${props.item.slug}?${window.location.search}`;
    const imageUrl = () => makeImageUrl('albums', props.item, 'thumb.small');
    const title = () => props.item.title || '';
    const label = () => `Album. ${title()}. Press to open details.`;

    const classList = () => ({
        AlbumItem: true,
        'AlbumItem-is-current': isCurrent(),
        'AlbumItem-is-transparent': !!props.item.id,
    });

    return (
        <Surface variant="card" classList={classList()}>
            <Flex gap="m" padding="m">
                <a
                    ref={buttonRef}
                    href={url()}
                    tabindex="0"
                    class="AlbumItem--button"
                    onFocus={handleOnFocus}
                    onClick={handleOnClick}
                    onKeyDown={handleKeyDown}
                    aria-label={label()}
                >
                    <AlbumTitle title={title()} slug={props.item.slug} />
                    <div class="AlbumItem--Thumb">
                        <Show when={props.item.id}>
                            <img alt="" src={imageUrl()} />
                        </Show>
                        <Show when={!props.item.id}>
                            <div class="AlbumItem--icon">
                                <BreadcrumbFolderIcon hasLink={true} isOpen={false} />
                            </div>
                        </Show>
                    </div>
                </a>
            </Flex>
        </Surface>
    );
};
