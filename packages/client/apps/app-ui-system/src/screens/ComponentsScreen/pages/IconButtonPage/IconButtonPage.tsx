import { IconButton } from '@noodlestan/ui-atoms';
import { PlusIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import { ComponentMeta } from '@/components/ComponentMeta';
import { DemoGroup } from '@/components/DemoGroup';
import { DemoItem } from '@/components/DemoItem';
import { DemoPage } from '@/components/DemoPage';
import { findComponent } from '@/data/components';

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
                    <IconButton icon={PlusIcon} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="variant">
                <DemoItem row title="primary">
                    <IconButton icon={PlusIcon} variant="primary" />
                </DemoItem>
                <DemoItem row title="secondary">
                    <IconButton icon={PlusIcon} variant="secondary" />
                </DemoItem>
                <DemoItem row title="plain">
                    <IconButton icon={PlusIcon} variant="plain" />
                </DemoItem>
                <DemoItem row title="danger">
                    <IconButton icon={PlusIcon} variant="danger" />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem row title="l">
                    <IconButton icon={PlusIcon} size="l" />
                </DemoItem>
                <DemoItem row title="m">
                    <IconButton icon={PlusIcon} size="m" />
                </DemoItem>
                <DemoItem row title="s">
                    <IconButton icon={PlusIcon} size="s" />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="disabled">
                <DemoItem row title="primary">
                    <IconButton icon={PlusIcon} variant="primary" disabled />
                </DemoItem>
                <DemoItem row title="secondary">
                    <IconButton icon={PlusIcon} variant="secondary" disabled />
                </DemoItem>
                <DemoItem row title="plain">
                    <IconButton icon={PlusIcon} variant="plain" disabled />
                </DemoItem>
                <DemoItem row title="danger">
                    <IconButton icon={PlusIcon} variant="danger" disabled />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onClick">
                <DemoItem row note="see console log">
                    <IconButton icon={PlusIcon} onClick={handleClick} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onTap">
                <DemoItem row note="see console log">
                    <IconButton icon={PlusIcon} onTap={handleTap} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem row note="Should override background color">
                    <IconButton icon={PlusIcon} classList={{ override: true }} />
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
