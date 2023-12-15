import { Flex } from '@noodlestan/ui-layouts';
import { Component, JSX, Show } from 'solid-js';

import { BannerSize } from '../Banner/Banner';
import { Text } from '../Text';
import type { TextSize } from '../Text/Text';

import './BannerMessage.css';

export type BannerMessageProps = {
    size?: BannerSize;
    button?: JSX.Element;
    children?: JSX.Element;
};

const defaultProps: Pick<BannerMessageProps, 'size'> = {
    size: 'm',
};

// TODO TextVariant
const SIZE_TEXT_SIZE_MAP: Record<BannerSize, TextSize> = {
    s: 's',
    m: 'm',
};

export const BannerMessage: Component<BannerMessageProps> = props => {
    const size = () => props.size || defaultProps.size;
    const textSize = (): TextSize => SIZE_TEXT_SIZE_MAP[size()];

    const classList = () => ({
        BannerMessage: true,
    });

    return (
        <Flex classList={classList()} direction="row" gap="m" align="center">
            <Text size={textSize()}>{props.children}</Text>
            <Show when={!!props.button}>{props.button}</Show>
        </Flex>
    );
};
