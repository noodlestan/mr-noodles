import type { PhotoQuery } from '@noodlestan/shared-types';
import { IconButton } from '@noodlestan/ui-atoms';
import { TextInput } from '@noodlestan/ui-forms';
import { Flex } from '@noodlestan/ui-layouts';
import { useSearchParams } from '@solidjs/router';
import { Search as SearchIcon } from 'lucide-solid';
import { Accessor, Component } from 'solid-js';

import { useAlbumsQueryContext } from '@/providers/AlbumsQuery';

import './AlbumsQueryBar.css';

export type AlbumsQueryBarProps = {
    query?: Accessor<PhotoQuery>;
};

export const AlbumsQueryBar: Component<AlbumsQueryBarProps> = () => {
    const { searchTerms, setSearchTerms } = useAlbumsQueryContext();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setParams] = useSearchParams();

    const handleClick = () => undefined;

    const classList = () => ({
        AlbumsQueryBar: true,
    });
    return (
        <Flex classList={classList()} direction="row" gap="m" align="center">
            <TextInput
                size="s"
                value={searchTerms()}
                onValueChange={value => {
                    setParams({ search: value });
                    setSearchTerms(value);
                }}
            />
            <IconButton size="s" variant="plain" icon={SearchIcon} onClick={handleClick} />
        </Flex>
    );
};
