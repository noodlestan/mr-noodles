import { IconButton } from '@noodlestan/ui-atoms';
import PlusSvg from '@noodlestan/ui-icons/src/assets/icons/plus.svg';
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
                    <IconButton icon={PlusSvg} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="variant">
                <DemoItem row title="primary">
                    <IconButton icon={PlusSvg} variant="primary" />
                </DemoItem>
                <DemoItem row title="secondary">
                    <IconButton icon={PlusSvg} variant="secondary" />
                </DemoItem>
                <DemoItem row title="plain">
                    <IconButton icon={PlusSvg} variant="plain" />
                </DemoItem>
                <DemoItem row title="danger">
                    <IconButton icon={PlusSvg} variant="danger" />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem row title="l">
                    <IconButton icon={PlusSvg} size="l" />
                </DemoItem>
                <DemoItem row title="m">
                    <IconButton icon={PlusSvg} size="m" />
                </DemoItem>
                <DemoItem row title="s">
                    <IconButton icon={PlusSvg} size="s" />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="disabled">
                <DemoItem row title="primary">
                    <IconButton icon={PlusSvg} variant="primary" disabled />
                </DemoItem>
                <DemoItem row title="secondary">
                    <IconButton icon={PlusSvg} variant="secondary" disabled />
                </DemoItem>
                <DemoItem row title="plain">
                    <IconButton icon={PlusSvg} variant="plain" disabled />
                </DemoItem>
                <DemoItem row title="danger">
                    <IconButton icon={PlusSvg} variant="danger" disabled />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onClick">
                <DemoItem row note="see console log">
                    <IconButton icon={PlusSvg} onClick={handleClick} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onTap">
                <DemoItem row note="see console log">
                    <IconButton icon={PlusSvg} onTap={handleTap} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem row note="Should override background color">
                    <IconButton icon={PlusSvg} classList={{ override: true }} />
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
