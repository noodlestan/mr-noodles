import { DataItem } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { findComponent } from '@/data/components';
import { ComponentMeta } from '@/ui/components/ComponentMeta';
import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoItem } from '@/ui/components/DemoItem';
import { DemoPage } from '@/ui/components/DemoPage';

import './DataItemPage.css';

const DATA_VALUE = 'The quick brown box jumped over the lazy old dog';

export const DataItemPage: Component = () => {
    const handleClick = () => console.info('Click');

    const COMPONENT = findComponent('DataItem');

    return (
        <DemoPage classList={{ DataItemPage: true }} title="DataItem">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem>
                    <DataItem>{DATA_VALUE}</DataItem>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="label">
                <DemoItem>
                    <DataItem label="Foobar">{DATA_VALUE}</DataItem>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem title="l">
                    <DataItem label="Foobar" size="l">
                        {DATA_VALUE}
                    </DataItem>
                </DemoItem>
                <DemoItem title="m">
                    <DataItem label="Foobar" size="m">
                        {DATA_VALUE}
                    </DataItem>
                </DemoItem>
                <DemoItem title="s">
                    <DataItem label="Foobar" size="s">
                        {DATA_VALUE}
                    </DataItem>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="length">
                <DemoItem title="full">
                    <DataItem label="Foobar" length="full">
                        {DATA_VALUE}
                    </DataItem>
                </DemoItem>
                <DemoItem title="l">
                    <DataItem label="Foobar" length="l">
                        {DATA_VALUE}
                    </DataItem>
                </DemoItem>
                <DemoItem title="m">
                    <DataItem label="Foobar" length="m">
                        {DATA_VALUE}
                    </DataItem>
                </DemoItem>
                <DemoItem title="s">
                    <DataItem label="Foobar" length="s">
                        {DATA_VALUE}
                    </DataItem>
                </DemoItem>
                <DemoItem title="auto">
                    <DataItem label="Foobar" length="auto">
                        {DATA_VALUE}
                    </DataItem>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onClick">
                <DemoItem note="see console log">
                    <DataItem label="Foobar" onClick={handleClick}>
                        {DATA_VALUE}
                    </DataItem>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem note="Should override text color">
                    <DataItem label="Foobar" classList={{ override: true }}>
                        {DATA_VALUE}
                    </DataItem>
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
