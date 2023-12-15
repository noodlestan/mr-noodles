import { Link, Text } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { findComponent } from '@/data/components';
import { ComponentMeta } from '@/ui/components/ComponentMeta';
import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoItem } from '@/ui/components/DemoItem';
import { DemoPage } from '@/ui/components/DemoPage';

import './LinkPage.css';

export const LinkPage: Component = () => {
    const handleClick = () => console.info('Click');
    const handleTap = () => console.info('Tap');

    const COMPONENT = findComponent('Link');

    return (
        <DemoPage classList={{ LinkPage: true }} title="Link">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur <Link>Foobar</Link> adipiscing elit.
                        In sit amet tempor turpis. Pellentesque libero enim, semper id sem a,
                        gravida semper nisl. Duis fermentum faucibus est non porta.
                    </Text>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="href">
                <DemoItem>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur{' '}
                        <Link href="https://github.com/">Foobar</Link> adipiscing elit. In sit amet
                        tempor turpis. Pellentesque libero enim, semper id sem a, gravida semper
                        nisl. Duis fermentum faucibus est non porta.
                    </Text>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="disabled">
                <DemoItem title="true">
                    <Link disabled>Foobar</Link>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onClick">
                <DemoItem note="See console log">
                    <Link onClick={handleClick}>Foobar</Link>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onTap">
                <DemoItem note="See console log">
                    <Link onTap={handleTap}>Foobar</Link>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem note="Should override text color">
                    <Link classList={{ override: true }}>Foobar</Link>
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
