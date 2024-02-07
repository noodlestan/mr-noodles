import { Button } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { ComponentMeta } from '@/components/ComponentMeta';
import { DemoGroup } from '@/components/DemoGroup';
import { DemoItem } from '@/components/DemoItem';
import { DemoPage } from '@/components/DemoPage';
import { findComponent } from '@/data/components';

import './ButtonPage.css';

export const ButtonPage: Component = () => {
    const handleClick = () => console.info('Click');
    const handleTap = () => console.info('Tap');

    const COMPONENT = findComponent('Button');

    return (
        <DemoPage classList={{ ButtonPage: true }} title="Button">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem row>
                    <Button>Foobar</Button>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="variant">
                <DemoItem row title="primary">
                    <Button variant="primary">Variant Primary</Button>
                </DemoItem>
                <DemoItem row title="secondary">
                    <Button variant="secondary">Variant Secondary</Button>
                </DemoItem>
                <DemoItem row title="plain">
                    <Button variant="plain">Variant Plain</Button>
                </DemoItem>
                <DemoItem row title="danger">
                    <Button variant="danger">Variant Danger</Button>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem row title="l">
                    <Button size="l">Size L</Button>
                </DemoItem>
                <DemoItem row title="m">
                    <Button size="m">Size M</Button>
                </DemoItem>
                <DemoItem row title="s">
                    <Button size="s">Size S</Button>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="length">
                <DemoItem row title="full">
                    <Button length="full">Length Full</Button>
                </DemoItem>
                <DemoItem row title="l">
                    <Button length="l">Length L</Button>
                </DemoItem>
                <DemoItem row title="m">
                    <Button length="m">Length M</Button>
                </DemoItem>
                <DemoItem row title="s">
                    <Button length="s">Length S</Button>
                </DemoItem>
                <DemoItem row title="(number)">
                    <Button length={20}>Length 20 (em)</Button>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="disabled">
                <DemoItem row title="primary">
                    <Button variant="primary" disabled>
                        Foobar
                    </Button>
                </DemoItem>
                <DemoItem row title="secondary">
                    <Button variant="secondary" disabled>
                        Foobar
                    </Button>
                </DemoItem>
                <DemoItem row title="plain">
                    <Button variant="plain" disabled>
                        Foobar
                    </Button>
                </DemoItem>
                <DemoItem row title="danger">
                    <Button variant="danger" disabled>
                        Foobar
                    </Button>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onClick">
                <DemoItem row note="see console log">
                    <Button onClick={handleClick}>Foobar</Button>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onTap">
                <DemoItem row note="see console log">
                    <Button onTap={handleTap}>Foobar</Button>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem row note="Should override background color">
                    <Button classList={{ override: true }}>Foobar</Button>
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
