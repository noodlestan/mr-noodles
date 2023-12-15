import { DataValue } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { findComponent } from '@/data/components';
import { ComponentMeta } from '@/ui/components/ComponentMeta';
import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoItem } from '@/ui/components/DemoItem';
import { DemoPage } from '@/ui/components/DemoPage';

import './DataValuePage.css';

const DATA_VALUE = 'The quick brown box jumped over the lazy old dog';

export const DataValuePage: Component = () => {
    const handleClick = () => console.info('Click');

    const COMPONENT = findComponent('DataValue');

    return (
        <DemoPage classList={{ DataValuePage: true }} title="DataValue">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem>
                    <DataValue>{DATA_VALUE}</DataValue>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem title="l">
                    <DataValue size="l">{DATA_VALUE}</DataValue>
                </DemoItem>
                <DemoItem title="m">
                    <DataValue size="m">{DATA_VALUE}</DataValue>
                </DemoItem>
                <DemoItem title="s">
                    <DataValue size="s">{DATA_VALUE}</DataValue>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="length">
                <DemoItem title="full">
                    <DataValue length="full">{DATA_VALUE}</DataValue>
                </DemoItem>
                <DemoItem title="l">
                    <DataValue length="l">{DATA_VALUE}</DataValue>
                </DemoItem>
                <DemoItem title="m">
                    <DataValue length="m">{DATA_VALUE}</DataValue>
                </DemoItem>
                <DemoItem title="s">
                    <DataValue length="s">{DATA_VALUE}</DataValue>
                </DemoItem>
                <DemoItem title="auto">
                    <DataValue length="auto">{DATA_VALUE}</DataValue>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onClick">
                <DemoItem note="See console log">
                    <DataValue onClick={handleClick}>{DATA_VALUE}</DataValue>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem note="Should override text color">
                    <DataValue classList={{ override: true }}>{DATA_VALUE}</DataValue>
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
