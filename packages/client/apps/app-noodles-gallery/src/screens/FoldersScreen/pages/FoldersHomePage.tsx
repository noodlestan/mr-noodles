/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { FolderNoodle } from '@noodlestan/shared-types';
import { inject } from '@noodlestan/ui-services';
import { Accessor, Component, Show } from 'solid-js';

import { FoldersPlaceholder } from './components/FoldersPlaceholder';

import { FoldersBar } from '@/molecules/FoldersBar/FoldersBar';
import { FoldersBreadcrumbs } from '@/molecules/FoldersBreadcrumbs/FoldersBreadcrumbs';
import { FoldersScroll } from '@/molecules/FoldersScroll/FoldersScroll';
import { PageLayout } from '@/molecules/PageLayout/PageLayout';
import { FolderDetails } from '@/organisms/FolderDetails/FolderDetails';
import { FolderItems } from '@/organisms/FolderItems/FolderItems';
import { Folders } from '@/organisms/Folders/Folders';
import { useFoldersNavigationContext } from '@/providers/FoldersNavigation';
import { useFoldersQueryContext } from '@/providers/FoldersQuery';
import { createFilesResource } from '@/resources/Files/createFilesResource';
import { FoldersService } from '@/services/Folders';

import './FoldersHomePage.css';

export type FoldersHomePageProps = {
    folders: Accessor<FolderNoodle[]>;
};

export const FoldersHomePage: Component<FoldersHomePageProps> = props => {
    const { parent, root, textSearch } = useFoldersQueryContext();

    const { getFolderByFilename } = inject(FoldersService);
    const navigationContext = useFoldersNavigationContext();
    const { showAllItems } = navigationContext;

    const query = () => ({ filterBy: { root: root(), folder: parent() || '/' } });
    const [filesResource] = createFilesResource(query);

    const showPlaceholder = () =>
        props.folders().length === 0 && !root() && !parent() && !textSearch();

    const folder = () => {
        const filename = parent() || '/';
        return getFolderByFilename(root() as string, filename);
    };

    return (
        <PageLayout classList={{ FoldersHomePage: true }}>
            <FoldersBar />
            <FoldersScroll>
                <FoldersBreadcrumbs />
                <Show when={root() && folder()}>
                    <FolderDetails
                        folder={folder() as FolderNoodle}
                        items={filesResource}
                        subfolders={props.folders}
                    />
                    <Show when={folder() && parent()}>
                        <FolderItems
                            folder={parent() as string}
                            items={filesResource}
                            toggleVisibility={props.folders().length > 0}
                            showAllItems={showAllItems()}
                        />
                    </Show>
                </Show>
                <Show when={!showAllItems()}>
                    <Folders items={props.folders} />
                </Show>
                <Show when={showPlaceholder()}>
                    <FoldersPlaceholder />
                </Show>
            </FoldersScroll>
        </PageLayout>
    );
};
