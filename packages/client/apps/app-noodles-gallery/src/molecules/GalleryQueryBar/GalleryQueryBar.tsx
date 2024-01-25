import type { FileQuery, IGroup, ISort } from '@noodlestan/shared-types';
import { Button } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Accessor, Component } from 'solid-js';

import { galleryStore } from '@/screens/TimelineScreen/private/store';
import { FilesService } from '@/services/Files';

import './GalleryQueryBar.css';

export type GalleryQueryBarProps = {
    query?: Accessor<FileQuery>;
};

const groupByToSortBy = (group: IGroup[]): ISort[] => {
    return group.map(({ field, dir }) => {
        return { field, dir };
    });
};

const DAY_ASC: IGroup = { field: 'dateTaken', group: 'day', dir: 'desc' };
const MONTH_ASC: IGroup = { field: 'dateTaken', group: 'month', dir: 'desc' };
const YEAR_ASC: IGroup = { field: 'dateTaken', group: 'year', dir: 'desc' };
const FOLDERS: IGroup = { field: 'filename', group: 'folder', dir: 'desc' };

export const GalleryQueryBar: Component<GalleryQueryBarProps> = () => {
    const classList = () => ({
        GalleryQueryBar: true,
    });

    // TODO move to createTimelineScreenContext(groupBy, query) <- arguments are in the createRenderEffect() below
    const { setQuery } = inject(FilesService);
    const { groupBy, setGroupBy, sortBy } = galleryStore;

    setGroupBy([DAY_ASC, FOLDERS]);

    const sort = () => groupByToSortBy(groupBy());
    setQuery({
        sortBy: [...sort(), ...sortBy()],
    });

    const handleDayClick = () => {
        const foldersOn = groupBy().length;
        const groups: IGroup[] = [DAY_ASC];
        if (foldersOn) {
            groups.push(FOLDERS);
        }
        setGroupBy(groups);
    };

    const handleMonthClick = () => {
        const foldersOn = groupBy().length;
        const groups: IGroup[] = [MONTH_ASC];
        if (foldersOn) {
            groups.push(FOLDERS);
        }
        setGroupBy(groups);
    };

    const handleYearClick = () => {
        const foldersOn = groupBy().length;
        const groups: IGroup[] = [YEAR_ASC];
        if (foldersOn) {
            groups.push(FOLDERS);
        }
        setGroupBy(groups);
    };

    const handleFoldersOnClick = () => {
        const dateGroup = groupBy()[0];
        const groups: IGroup[] = [dateGroup];
        setGroupBy(groups);
    };

    const handleFoldersOffClick = () => {
        const dateGroup = groupBy()[0];
        const groups: IGroup[] = [dateGroup, { field: 'filename', group: 'folder', dir: 'asc' }];
        setGroupBy(groups);
    };

    return (
        <Flex classList={classList()} direction="row" gap="s" align="start">
            <>
                Group
                <Button variant="secondary" onClick={handleDayClick}>
                    Day
                </Button>
                <Button variant="secondary" onClick={handleMonthClick}>
                    Month
                </Button>
                <Button variant="secondary" onClick={handleYearClick}>
                    Year
                </Button>
            </>
            |
            <>
                Folders
                <Button variant="secondary" onClick={handleFoldersOnClick}>
                    On
                </Button>
                <Button variant="secondary" onClick={handleFoldersOffClick}>
                    Off
                </Button>
            </>
        </Flex>
    );
};
