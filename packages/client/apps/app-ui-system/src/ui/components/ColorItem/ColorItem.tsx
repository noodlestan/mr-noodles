/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { DataItem } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { ColorSource } from '@noodlestan/ui-theme-base';
import { Component, Show, createSignal } from 'solid-js';

import { contrastColor } from './contrastColor';

import './ColorItem.css';

type ColorItemProps = {
    source: ColorSource;
    size?: 's' | 'm' | 'l';
};

export const ColorItem: Component<ColorItemProps> = props => {
    const [expanded, setExpanded] = createSignal(false);

    const size = () => (expanded() ? 'l' : props.size);

    const handleClick = () => setExpanded(e => !e);

    return (
        <div
            role="button"
            onClick={handleClick}
            classList={{
                ColorItem: true,
                [`ColorItem--expanded`]: expanded(),
                [`ColorItem--size-${size()}`]: true,
            }}
        >
            <span
                class="ColorItem-value"
                style={{
                    'background-color': props.source.value,
                    color: contrastColor(props.source.value),
                }}
            >
                {props.source.name}
            </span>
            <Show when={expanded()}>
                <Surface variant="banner" classList={{ 'ColorItem-source': true }}>
                    <Flex padding="s" gap="s">
                        <DataItem label="h" size="s">
                            {props.source.h?.join(' ')}
                        </DataItem>
                        <DataItem label="s" size="s">
                            {props.source.s?.join(' ')}
                        </DataItem>
                        <DataItem label="l" size="s">
                            {props.source.l?.join(' ')}
                        </DataItem>
                    </Flex>
                </Surface>
            </Show>
        </div>
    );
};
