import type {
    APIResponse,
    FileNoodle,
    FolderNoodle,
    MediaFileNoodle,
} from '@noodlestan/shared-types';
import { Text } from '@noodlestan/ui-atoms';
import { SkeletonText } from '@noodlestan/ui-skeletons';
import { Accessor, Component, Resource, Show } from 'solid-js';

import { mediumDate } from '../../functions/mediumDate';

import { FolderTitle } from '@/molecules/FolderTitle/FolderTitle';
import { makeImageUrl } from '@/services/Images';

import './FolderDetails.css';

export type FolderDetailsProps = {
    folder: FolderNoodle;
    items: Resource<APIResponse<FileNoodle[]>>;
    subfolders: Accessor<FolderNoodle[]>;
};

const fileDate = (f: FileNoodle): Date => {
    const media = f as MediaFileNoodle;
    if (media.dateTaken) {
        return media.dateTaken;
    }
    return f.dateCreated || new Date(0);
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
    const hasDates = () => !!props.dateFrom && !!props.dateUntil;
    const sameDay = () => mediumDate(props.dateFrom) === mediumDate(props.dateUntil);

    console.log(
        'from',
        typeof props.dateFrom,
        mediumDate(props.dateFrom),
        'until',
        typeof props.dateUntil,
        mediumDate(props.dateUntil),
        'has',
        hasDates(),
        'same',
        sameDay(),
    );
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
    const isRoot = () => props.folder.filename === '/';

    const imageUrl = () => {
        if (props.folder) {
            return makeImageUrl('folder', props.folder, 'thumb.small');
        }
    };

    const items = () => props.items()?.data || [];
    const sortedItems = () => items().sort((a, b) => fileDate(a).valueOf() - fileDate(b).valueOf());
    const dateFrom = () => {
        const d = props.folder.dateFrom;
        if (d) {
            return d;
        }
        const i = sortedItems();
        return maybeFileDate(i[0]);
    };
    const dateUntil = () => {
        const d = props.folder.dateUntil;
        if (d) {
            return d;
        }
        const i = sortedItems();
        return maybeFileDate(i[i.length - 1]);
    };
    const dateCreated = () => {
        const d = props.folder.dateCreated;
        return d ? mediumDate(d) : '';
    };

    const hasDates = () => {
        return dateFrom() && dateUntil();
    };

    const itemsText = () => {
        const length = props.items()?.data.length || 0;
        return length > 1 ? `${length} items` : length === 1 ? '1 item' : 'no items';
    };

    const subFoldersText = () => {
        const length = props.subfolders()?.length;
        return length > 1 ? `${length} folders` : length === 1 ? '1 folder' : 'no folders';
    };

    const classList = () => ({
        FolderDetails: true,
    });

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div classList={classList()}>
            <div class="FolderDetails--Details">
                <div class="FolderDetails--Title">
                    <FolderTitle
                        root={props.folder.root}
                        title={props.folder.title}
                        filename={props.folder.filename}
                        level={1}
                    />
                </div>
                <Show when={hasDates()}>
                    <DateSpan dateFrom={dateFrom()} dateUntil={dateUntil()} />
                </Show>
                <Show when={isRoot()}>
                    <Text>Created on {dateCreated()}</Text>
                </Show>

                <Text size="l">
                    {itemsText()}, {subFoldersText()}
                </Text>
            </div>
            <div class="FolderDetails--Thumb">
                <img alt="" src={imageUrl()} />
            </div>
        </div>
    );
};
