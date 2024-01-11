import { APIResponse, PhotoData } from '@noodlestan/shared-types';
import { Text } from '@noodlestan/ui-atoms';
import { inject } from '@noodlestan/ui-services';
import { SkeletonText } from '@noodlestan/ui-skeletons';
import { Component, Resource, Show } from 'solid-js';

import { BreadcrumbFolderIcon } from '@/atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';
import { AlbumTitle } from '@/molecules/AlbumTitle/AlbumTitle';
import { AlbumsService } from '@/services/Albums';
import { makeImageUrl } from '@/services/Images';

import './AlbumDetails.css';

export type AlbumDetailsProps = {
    album: string;
    items: Resource<APIResponse<PhotoData[]>>;
};

const mediumDate = (date?: Date): string => {
    if (!date) {
        return 'x';
    }
    try {
        return new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'medium',
            timeZone: 'Europe/Madrid',
        }).format(date);
    } catch (err) {
        return '';
    }
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

export const AlbumDetails: Component<AlbumDetailsProps> = props => {
    const { getAlbumBySlug } = inject(AlbumsService);

    const item = () => getAlbumBySlug(props.album);
    const title = () => item()?.title || '';
    const imageUrl = () => {
        const i = item();
        if (i) {
            return makeImageUrl('albums', i, 'thumb.small');
        }
    };

    // const images =
    const items = () => (props.album ? props.items()?.data || [] : []);
    const sortedItems = () =>
        items().sort((a, b) => a.dateCreated.valueOf() - b.dateCreated.valueOf());
    const dateFrom = () => {
        const d = item()?.dateFrom;
        if (d) {
            return d;
        }
        const i = sortedItems();
        return i[0]?.date;
    };
    const dateUntil = () => {
        const d = item()?.dateUntil;
        if (d) {
            return d;
        }
        const i = sortedItems();
        return i[i.length - 1]?.date;
    };
    const dateCreated = () => {
        const d = item()?.dateCreated;
        return d ? mediumDate(d) : '';
    };

    const hasDates = () => dateFrom() && dateUntil();

    const classList = () => ({
        AlbumDetails: true,
    });

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div classList={classList()}>
            <div class="AlbumDetails--Details">
                <div class="AlbumDetails--Title">
                    <AlbumTitle title={title()} slug={item()?.slug || ''} level={1} />
                </div>
                <Show when={hasDates()}>
                    <DateSpan dateFrom={dateFrom()} dateUntil={dateUntil()} />
                </Show>
                <Text>Created on {dateCreated()}</Text>
            </div>
            <div class="AlbumDetails--Thumb">
                <Show when={item()?.id}>
                    <img alt="" src={imageUrl()} />
                </Show>
                <Show when={!item()?.id}>
                    <div class="AlbumDetails--icon">
                        <BreadcrumbFolderIcon hasLink={true} isOpen={false} />
                    </div>
                </Show>
            </div>
        </div>
    );
};
