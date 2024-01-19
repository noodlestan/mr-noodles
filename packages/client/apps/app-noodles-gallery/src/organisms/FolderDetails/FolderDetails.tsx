import type { APIResponse, FileNoodle, MediaFileNoodle } from '@noodlestan/shared-types';
import { Text } from '@noodlestan/ui-atoms';
import { inject } from '@noodlestan/ui-services';
import { SkeletonText } from '@noodlestan/ui-skeletons';
import { Component, Resource, Show } from 'solid-js';

import { mediumDate } from '../../functions/mediumDate';

import { BreadcrumbFolderIcon } from '@/atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';
import { FolderTitle } from '@/molecules/FolderTitle/FolderTitle';
import { FoldersService } from '@/services/Folders';
import { makeImageUrl } from '@/services/Images';

import './FolderDetails.css';

export type FolderDetailsProps = {
    folder: string;
    items: Resource<APIResponse<FileNoodle[]>>;
};

const fileDate = (f: FileNoodle): Date => {
    const media = f as MediaFileNoodle;
    if (media.dateTaken) {
        return media.dateTaken;
    }
    return f.dateCreated;
};

const maybeFileDate = (f?: FileNoodle): Date | undefined => {
    if (!f) {
        return;
    }
    return fileDate(f);
};

type DateSpanProps = {
    dateFrom?: Date;
    dateUntil?: Date;
};

const DateSpan: Component<DateSpanProps> = props => {
    const hasDates = () => props.dateFrom && props.dateUntil;
    const sameDay = () => mediumDate(props.dateFrom) === mediumDate(props.dateUntil);
    return (
        <>
            <Show when={!hasDates()}>
                <SkeletonText size="m" />;
            </Show>
            <Show when={hasDates() && !sameDay()}>
                <Text size="l">
                    Between {mediumDate(props.dateFrom)} and {mediumDate(props.dateUntil)}
                </Text>
            </Show>
            <Show when={hasDates() && sameDay()}>
                <Text size="l">On {mediumDate(props.dateFrom)}</Text>
            </Show>
        </>
    );
};

export const FolderDetails: Component<FolderDetailsProps> = props => {
    const { getFolderBySlug } = inject(FoldersService);

    const item = () => getFolderBySlug(props.folder);
    const title = () => item()?.title || '';
    const imageUrl = () => {
        const i = item();
        if (i) {
            return makeImageUrl('folders', i, 'thumb.small');
        }
    };

    const items = () => (props.folder ? props.items()?.data || [] : []);
    const sortedItems = () => items().sort((a, b) => fileDate(a).valueOf() - fileDate(b).valueOf());
    const dateFrom = () => {
        const d = item()?.dateFrom;
        if (d) {
            return d;
        }
        const i = sortedItems();
        return maybeFileDate(i[0]);
    };
    const dateUntil = () => {
        const d = item()?.dateUntil;
        if (d) {
            return d;
        }
        const i = sortedItems();
        return maybeFileDate(i[i.length - 1]);
    };
    const dateCreated = () => {
        const d = item()?.dateCreated;
        return d ? mediumDate(d) : '';
    };

    const hasDates = () => dateFrom() && dateUntil();

    const classList = () => ({
        FolderDetails: true,
    });

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div classList={classList()}>
            <div class="FolderDetails--Details">
                <div class="FolderDetails--Title">
                    <FolderTitle title={title()} slug={''} level={1} />
                </div>
                <Show when={hasDates()}>
                    <DateSpan dateFrom={dateFrom()} dateUntil={dateUntil()} />
                </Show>
                <Text>Created on {dateCreated()}</Text>
            </div>
            <div class="FolderDetails--Thumb">
                <Show when={item()?.id}>
                    <img alt="" src={imageUrl()} />
                </Show>
                <Show when={!item()?.id}>
                    <div class="FolderDetails--icon">
                        <BreadcrumbFolderIcon hasLink={true} isOpen={false} />
                    </div>
                </Show>
            </div>
        </div>
    );
};
