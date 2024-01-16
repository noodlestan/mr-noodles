import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { Accessor, Component, JSX } from 'solid-js';

import { FolderTitle } from '../FolderTitle/FolderTitle';

import { GalleryGroup, GalleryGroupAttributesFolder } from '@/models/gallery/types';
import { GalleryGroupHeader } from '@/molecules/GalleryGroupHeader/GalleryGroupHeader';
import { FoldersService } from '@/services/Folders';

import './GalleryGroupItemFolder.css';

type GalleryGroupItemFolderProps = {
    children: JSX.Element;
    group: Accessor<GalleryGroup>;
};

export const GalleryGroupItemFolder: Component<GalleryGroupItemFolderProps> = props => {
    const { getFolderBySlug } = inject(FoldersService);

    const attributes = (): GalleryGroupAttributesFolder =>
        props.group().attributes as GalleryGroupAttributesFolder;

    const folderSlug = () => attributes().folder || '';
    const folderName = () => {
        const name = attributes().folder;
        if (name) {
            return getFolderBySlug(name)?.title || 'no name';
        } else {
            return 'no folder';
        }
    };

    const classList = () => ({
        GalleryGroupItemFolder: true,
    });

    return (
        <Surface variant="card">
            <Flex classList={classList()} direction="column" padding="m">
                <GalleryGroupHeader group={props.group}>
                    <FolderTitle slug={folderSlug()} title={folderName()} showLink showIcon />
                </GalleryGroupHeader>
                {props.children}
            </Flex>
        </Surface>
    );
};
