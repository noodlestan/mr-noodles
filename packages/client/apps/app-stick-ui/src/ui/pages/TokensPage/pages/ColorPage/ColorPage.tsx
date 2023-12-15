import { Flex } from '@noodlestan/ui-layouts';
import {
    listBgColors,
    listFgColors,
    listHueTokens,
    listPaletteColors,
} from '@noodlestan/ui-theme-base';
import { Component, For } from 'solid-js';

import { ColorItem } from '@/ui/components/ColorItem/ColorItem';
import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoPage } from '@/ui/components/DemoPage';

import './ColorPage.css';

export const ColorPage: Component = () => {
    return (
        <DemoPage classList={{ ColorPage: true }} title="Color">
            <DemoGroup title="Foreground">
                <Flex direction="row" wrap gap="l">
                    <For each={listFgColors()}>{v => <ColorItem size="l" source={v} />}</For>
                </Flex>
            </DemoGroup>
            <DemoGroup title="Background">
                <Flex direction="row" wrap gap="l">
                    <For each={listBgColors()}>{v => <ColorItem size="l" source={v} />}</For>
                </Flex>
            </DemoGroup>
            <For each={listHueTokens()}>
                {h => (
                    <DemoGroup title={h}>
                        <Flex direction="row" wrap gap="l">
                            <For each={listPaletteColors(h)}>
                                {v => <ColorItem size="m" source={v} />}
                            </For>
                        </Flex>
                    </DemoGroup>
                )}
            </For>
        </DemoPage>
    );
};
