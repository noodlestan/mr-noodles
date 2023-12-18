import type { PhotoQuery } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, createEffect } from 'solid-js';

import './QueryBar.css';

export type QueryBarProps = {
    query?: Accessor<PhotoQuery>;
};

export const QueryBar: Component<QueryBarProps> = props => {
    const classList = () => ({
        QueryBar: true,
    });

    createEffect(() => {
        console.info('QueryBar:props.query', props.query && props.query());
    });

    return (
        <Flex classList={classList()} gap="m" align="center">
            Query bar goes here
        </Flex>
    );
};
