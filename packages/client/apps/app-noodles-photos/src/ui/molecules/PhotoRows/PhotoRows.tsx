import { PhotoData } from '@noodlestan/shared-types';
import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For, Show } from 'solid-js';

import './PhotoRows.css';

export type PhotoRowProps = {
    photos: Accessor<PhotoData[]>;
};

export const PhotoRow: Component<PhotoRowProps> = props => {
    return (
        <For each={props.photos && props.photos()}>
            {item => {
                const date = item.date ? new Date(item.date).toString() : '';
                return (
                    <Flex>
                        <Text size="l">{item.id}</Text>
                        <Text size="s">{date}</Text>
                        <img alt="" src={`http://localhost:8008/photos/${item.id}/thumb`} />
                    </Flex>
                );
            }}
        </For>
    );
};

export type PhotoRowsProps = {
    rows: Accessor<PhotoData[][]>;
};

export const PhotoRows: Component<PhotoRowsProps> = props => {
    const classList = () => ({
        PhotoRows: true,
    });

    return (
        <Flex classList={classList()} gap="m" align="start" direction="column">
            <Show when={props.rows}>
                <For each={props.rows && props.rows()}>
                    {row => <PhotoRow photos={() => row} />}
                </For>
            </Show>
        </Flex>
    );
};
