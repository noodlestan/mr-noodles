import { Flex } from '@noodlestan/ui-layouts';
import { Component } from 'solid-js';

import { findComponent } from '@/data/components';
import { ComponentMeta } from '@/ui/components/ComponentMeta';
import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoItem } from '@/ui/components/DemoItem';
import { DemoPage } from '@/ui/components/DemoPage';
import { ExampleTiny } from '@/ui/components/ExampleTiny';

import './FlexPage.css';

export const FlexPage: Component = () => {
    const COMPONENT = findComponent('Flex');

    return (
        <DemoPage classList={{ FlexPage: true }} title="Flex">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem>
                    <Flex>
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="direction">
                <DemoItem title="row">
                    <Flex direction="row">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="column">
                    <Flex direction="column">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="row-reverse">
                    <Flex direction="row-reverse">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="column-reverse">
                    <Flex direction="column-reverse">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="align">
                <DemoItem title="start">
                    <Flex align="start">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="center">
                    <Flex align="center">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="end">
                    <Flex align="end">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="stretch">
                    <Flex align="stretch">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="justify" classList={{ 'FlexPage--justify-demo': true }}>
                <DemoItem title="start">
                    <Flex justify="start" full>
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="center">
                    <Flex justify="center" full>
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="end">
                    <Flex justify="end" full>
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="stretch">
                    <Flex justify="stretch" full>
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="gap">
                <DemoItem title="none">
                    <Flex direction="row" gap="none">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="s">
                    <Flex direction="row" gap="s">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="m">
                    <Flex direction="row" gap="m">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="l">
                    <Flex direction="row" gap="l">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="xl">
                    <Flex direction="row" gap="xl">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="2xl">
                    <Flex direction="row" gap="2xl">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="padding">
                <DemoItem title="none">
                    <Flex direction="row">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="s">
                    <Flex direction="row" padding="s">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="m">
                    <Flex direction="row" padding="m">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
                <DemoItem title="l">
                    <Flex direction="row" padding="l">
                        <ExampleTiny />
                    </Flex>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem note="Should override text color">
                    <Flex classList={{ override: true }}>Foobar</Flex>
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
