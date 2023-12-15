import { Label, Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import type { SurfaceProps } from '@noodlestan/ui-surfaces';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, JSX, splitProps } from 'solid-js';

import './SurfaceVariantExample.css';

type SurfaceVariantProps = SurfaceProps & {
    onVariant: string;
    children: JSX.Element;
};

export const SurfaceVariant: Component<SurfaceVariantProps> = props => {
    const [localProps, surfaceProps] = splitProps(props, ['onVariant', 'children']);

    return (
        <Flex gap="s" classList={{ SurfaceVariantExample: true }}>
            <Label>{surfaceProps.variant}</Label>
            <Surface variant={localProps.onVariant}>
                <Flex padding="l" gap="m">
                    <Surface {...surfaceProps}>
                        <Flex>{localProps.children}</Flex>
                    </Surface>
                    <Text size="xs">(on {localProps.onVariant})</Text>
                </Flex>
            </Surface>
        </Flex>
    );
};
