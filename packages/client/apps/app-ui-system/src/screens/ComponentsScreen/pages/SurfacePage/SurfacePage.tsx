import { Label, Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component } from 'solid-js';

import { ComponentMeta } from '@/components/ComponentMeta';
import { DemoGroup } from '@/components/DemoGroup';
import { DemoPage } from '@/components/DemoPage';
import { ExampleLarge } from '@/components/ExampleLarge';
import { ExampleMedium } from '@/components/ExampleMedium';
import { ExampleSmall } from '@/components/ExampleSmall';
import { ExampleTiny } from '@/components/ExampleTiny';
import { SurfaceVariant } from '@/components/SurfaceVariantExample';
import { findComponent } from '@/data/components';

import './SurfacePage.css';

export const SurfacePage: Component = () => {
    const handleClick = () => console.info('Click');
    const handleTap = () => console.info('Tap');

    const COMPONENT = findComponent('Surface');

    return (
        <DemoPage classList={{ SurfacePage: true }} title="Surface">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <Flex gap="s">
                    <Label>stage</Label>
                    <Surface variant="stage">
                        <Flex padding="l" direction="row" gap="s" align="center">
                            <ExampleTiny title="Foobar" />
                        </Flex>
                    </Surface>
                </Flex>
            </DemoGroup>
            <DemoGroup title="variant">
                <Flex gap="xl" classList={{ 'SurfacePage--Variants': true }}>
                    <SurfaceVariant variant="page" onVariant="stage">
                        <ExampleLarge title="Foobar" />
                    </SurfaceVariant>
                    <SurfaceVariant variant="card" onVariant="page">
                        <ExampleMedium title="Foobar" />
                    </SurfaceVariant>
                    <SurfaceVariant variant="banner" onVariant="page">
                        <ExampleMedium title="Foobar" />
                    </SurfaceVariant>
                    <SurfaceVariant variant="inverse" onVariant="stage">
                        <ExampleMedium title="Foobar" />
                    </SurfaceVariant>
                </Flex>
            </DemoGroup>
            <DemoGroup title="tag">
                <Flex gap="s">
                    <Surface variant="card" tag="section">
                        <ExampleSmall title="Foobar" />
                    </Surface>
                </Flex>
            </DemoGroup>
            <DemoGroup title="disabled">
                <Surface variant="card" disabled>
                    <ExampleSmall title="Foobar" />
                </Surface>
            </DemoGroup>
            <DemoGroup title="onClick">
                <Surface variant="card" tag="section" onClick={handleClick}>
                    <ExampleSmall title="Foobar" />
                </Surface>
                <Text size="xs">see console log</Text>
            </DemoGroup>
            <DemoGroup title="onTap">
                <Surface variant="card" tag="section" onTap={handleTap}>
                    <ExampleSmall title="Foobar" />
                </Surface>
                <Text size="xs">see console log</Text>
            </DemoGroup>
            <DemoGroup title="classList">
                <Surface variant="card" tag="section" classList={{ override: true }}>
                    <ExampleSmall title="Foobar" />
                </Surface>
                <Text size="xs">Should override text color</Text>
            </DemoGroup>
        </DemoPage>
    );
};
