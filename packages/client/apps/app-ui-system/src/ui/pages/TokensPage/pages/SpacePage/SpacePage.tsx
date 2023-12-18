import { listGapTokens, listPaddingTokens, listSizeTokens } from '@noodlestan/ui-theme-base';
import { Component, For } from 'solid-js';

import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoPage } from '@/ui/components/DemoPage';
import { SizeItem } from '@/ui/components/SizeItem';

import './SpacePage.css';

export const SpacePage: Component = () => {
    return (
        <DemoPage classList={{ SpacePage: true }} title="Space">
            <DemoGroup title="Size">
                <For each={listSizeTokens()}>{v => <SizeItem source={v} />}</For>
            </DemoGroup>
            <DemoGroup title="Padding">
                <For each={listPaddingTokens()}>{v => <SizeItem source={v} />}</For>
            </DemoGroup>
            <DemoGroup title="Gap">
                <For each={listGapTokens()}>{v => <SizeItem source={v} />}</For>
            </DemoGroup>
        </DemoPage>
    );
};
