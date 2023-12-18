import { IconButton } from '@noodlestan/ui-atoms';
import InfoSvg from '@noodlestan/ui-icons/src/assets/icons/info.svg';
import { Component } from 'solid-js';

import { findComponent } from '@/data/components';
import { ComponentMeta } from '@/ui/components/ComponentMeta';
import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoItem } from '@/ui/components/DemoItem';
import { DemoPage } from '@/ui/components/DemoPage';

import './IconButtonPage.css';

export const IconButtonPage: Component = () => {
    const handleClick = () => console.info('Click');
    const handleTap = () => console.info('Tap');

    const COMPONENT = findComponent('IconButton');

    return (
        <DemoPage classList={{ IconButtonPage: true }} title="IconButton">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem row>
                    <IconButton svg={InfoSvg} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="variant">
                <DemoItem row title="primary">
                    <IconButton svg={InfoSvg} variant="primary" />
                </DemoItem>
                <DemoItem row title="secondary">
                    <IconButton svg={InfoSvg} variant="secondary" />
                </DemoItem>
                <DemoItem row title="plain">
                    <IconButton svg={InfoSvg} variant="plain" />
                </DemoItem>
                <DemoItem row title="danger">
                    <IconButton svg={InfoSvg} variant="danger" />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem row title="l">
                    <IconButton svg={InfoSvg} size="l" />
                </DemoItem>
                <DemoItem row title="m">
                    <IconButton svg={InfoSvg} size="m" />
                </DemoItem>
                <DemoItem row title="s">
                    <IconButton svg={InfoSvg} size="s" />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="disabled">
                <DemoItem row title="primary">
                    <IconButton svg={InfoSvg} variant="primary" disabled />
                </DemoItem>
                <DemoItem row title="secondary">
                    <IconButton svg={InfoSvg} variant="secondary" disabled />
                </DemoItem>
                <DemoItem row title="plain">
                    <IconButton svg={InfoSvg} variant="plain" disabled />
                </DemoItem>
                <DemoItem row title="danger">
                    <IconButton svg={InfoSvg} variant="danger" disabled />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onClick">
                <DemoItem row note="see console log">
                    <IconButton svg={InfoSvg} onClick={handleClick} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onTap">
                <DemoItem row note="see console log">
                    <IconButton svg={InfoSvg} onTap={handleTap} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem row note="Should override background color">
                    <IconButton svg={InfoSvg} classList={{ override: true }} />
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
