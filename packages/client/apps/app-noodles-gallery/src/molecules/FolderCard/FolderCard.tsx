import type { FolderNoodle } from '@noodlestan/shared-types';
// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { useSearchParams } from '@solidjs/router';
import { Component, Show, createEffect } from 'solid-js';

import { BreadcrumbFolderIcon } from '@/atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';
import { FolderTitle } from '@/molecules/FolderTitle/FolderTitle';
import { useUrl } from '@/navigation/useUrl';
import { useFoldersNavigationContext } from '@/providers/FoldersNavigation';
import { makeImageUrl } from '@/services/Images/makeImageUrl';
import { RootsService } from '@/services/Roots';

import './FolderCard.css';

export type FolderCardProps = {
    item: FolderNoodle;
};

export const FolderCard: Component<FolderCardProps> = props => {
    let buttonRef: HTMLAnchorElement | undefined;

    const { bus, current, isModal } = useFoldersNavigationContext();
    const { getRootById } = inject(RootsService);

    const isCurrent = () => current()?.id === props.item.id;
    const rootId = () => getRootById(props.item.root)?.id;

    const handleOnFocus = () => bus?.emit({ name: 'onFocus', value: props.item.id });
    const handleOnClick = () => {
        bus?.emit({ name: 'onClick', value: props.item.id });
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
        }
    });

    const [searchParams] = useSearchParams();
    const url = () => useUrl(searchParams, `/folders/${rootId()}${props.item.filename}`);
    const imageUrl = () => makeImageUrl('folder', props.item, 'thumb.small');
    const title = () => props.item.title || props.item.filename;
    const label = () => `Folder. ${title()}. Press to open details.`;

    const classList = () => ({
        FolderCard: true,
        'FolderCard-is-current': isCurrent(),
        // 'FolderCard-is-transparent': !!props.item.id,
    });

    return (
        <Surface variant="card" classList={classList()}>
            <Flex padding="m">
                <a
                    ref={buttonRef}
                    href={url()}
                    tabindex="0"
                    class="FolderCard--Button"
                    onFocus={handleOnFocus}
                    onClick={handleOnClick}
                    onKeyDown={handleKeyDown}
                    aria-label={label()}
                >
                    <div class="FolderCard--Title">
                        <FolderTitle
                            title={props.item.title}
                            root={props.item.root}
                            filename={props.item.filename}
                            showIcon
                        />
                    </div>
                    <div class="FolderCard--Thumb">
                        <Show when={props.item.id}>
                            <img alt="" src={imageUrl()} />
                        </Show>
                        <Show when={!props.item.id}>
                            <div class="FolderCard--Icon">
                                <BreadcrumbFolderIcon hasLink={true} isOpen={false} />
                            </div>
                        </Show>
                    </div>
                </a>
            </Flex>
        </Surface>
    );
};
