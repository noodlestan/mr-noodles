/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { FolderNoodle } from '@noodlestan/shared-types';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { useParams } from '@solidjs/router';
import { Accessor, Component, Show } from 'solid-js';

import { FoldersBar } from '@/molecules/FoldersBar/FoldersBar';
import { FoldersBreadcrumbs } from '@/molecules/FoldersBreadcrumbs/FoldersBreadcrumbs';
import { FoldersScroll } from '@/molecules/FoldersScroll/FoldersScroll';
import { FolderDetails } from '@/organisms/FolderDetails/FolderDetails';
import { FolderItems } from '@/organisms/FolderItems/FolderItems';
import { Folders } from '@/organisms/Folders/Folders';
import { useFoldersNavigationContext } from '@/providers/FoldersNavigation';
import { createFilesResource } from '@/resources/File/createFilesResource';
import { FoldersService } from '@/services/Folders';

import './FoldersHomePage.css';

export type FoldersHomePageProps = {
    items: Accessor<FolderNoodle[]>;
};

export const FoldersHomePage: Component<FoldersHomePageProps> = props => {
    const { loading } = inject(FoldersService);

    const params = useParams();

    const navigationContext = useFoldersNavigationContext();
    const { showAllItems } = navigationContext;

    const query = () => ({ filterBy: { folder: params.parent } });
    const [resource] = createFilesResource(query);

    return (
        <Surface variant="stage">
            <FoldersBar />
            <FoldersScroll>
                <Show when={loading()}>Loading</Show>
                <Show when={!loading()}>
                    <FoldersBreadcrumbs />
                    <Show when={params.parent}>
                        <FolderDetails folder={params.parent} items={resource} />
                        <FolderItems
                            folder={params.parent}
                            items={resource}
                            toggleVisibility={props.items().length > 0}
                            showAllItems={showAllItems()}
                        />
                    </Show>
                    <Show when={!showAllItems()}>
                        <Folders items={props.items} />
                    </Show>
                </Show>
            </FoldersScroll>
        </Surface>
    );
};
