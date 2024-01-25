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
    const { getFolderByFilename } = inject(FoldersService);

    const attributes = () => props.group().attributes as GalleryGroupAttributesFolder;

    const folderName = () => {
        const root = attributes().root;
        const filename = attributes().folder;
        if (root && filename) {
            if (filename === '/') {
                return 'ROOT?';
            }
            const folder = getFolderByFilename(root, filename);
            return folder ? folder.filename.split('/').splice(0, -1).join('/') : 'no name';
        }
        return ':-/ ?';
    };

    const classList = () => ({
        GalleryGroupItemFolder: true,
    });

    return (
        <Surface variant="card">
            <Flex classList={classList()} direction="column" padding="m">
                <GalleryGroupHeader group={props.group}>
                    <FolderTitle
                        root={attributes().root}
                        filename={attributes().folder}
                        title={folderName()}
                        showLink
                        showIcon
                    />
                </GalleryGroupHeader>
                {props.children}
            </Flex>
        </Surface>
    );
};
