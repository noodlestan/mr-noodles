import { Label, Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, JSX, Show } from 'solid-js';

import './DemoItem.css';

type DemoItemProps = {
    title?: string;
    note?: string;
    row?: boolean;
    children?: JSX.Element;
};

export const DemoItem: Component<DemoItemProps> = props => {
    return (
        <Surface tag="section" variant="card" classList={{ DemoItem: true }}>
            <Flex gap="s" padding="m">
                <Show when={props.title}>
                    <Label>{props.title}</Label>
                </Show>
                <Flex gap="m" direction={props.row ? 'row' : 'column'}>
                    {props.children}
                </Flex>
                <Show when={props.note}>
                    <Text size="xs">{props.note}</Text>
                </Show>
            </Flex>
        </Surface>
    );
};
