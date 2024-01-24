import type { FileQuery } from '@noodlestan/shared-types';
import { IconButton } from '@noodlestan/ui-atoms';
import { TextInput } from '@noodlestan/ui-forms';
import { Flex } from '@noodlestan/ui-layouts';
import { useSearchParams } from '@solidjs/router';
import { Search as SearchIcon } from 'lucide-solid';
import { Accessor, Component } from 'solid-js';

import { useFoldersQueryContext } from '@/providers/FoldersQuery';

import './FoldersQueryBar.css';

export type FoldersQueryBarProps = {
    query?: Accessor<FileQuery>;
};

export const FoldersQueryBar: Component<FoldersQueryBarProps> = () => {
    const { textSearch, setTextSearch } = useFoldersQueryContext();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setParams] = useSearchParams();

    const handleClick = () => undefined;

    const classList = () => ({
        FoldersQueryBar: true,
    });
    return (
        <Flex classList={classList()} direction="row" gap="m" align="center">
            <TextInput
                size="s"
                value={textSearch()}
                onValueChange={value => {
                    setParams({ search: value });
                    setTextSearch(value);
                }}
            />
            <IconButton size="s" variant="plain" icon={SearchIcon} onClick={handleClick} />
        </Flex>
    );
};
