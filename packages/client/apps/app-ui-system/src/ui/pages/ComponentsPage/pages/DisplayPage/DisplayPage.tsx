import { Display } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { findComponent } from '@/data/components';
import { ComponentMeta } from '@/ui/components/ComponentMeta';
import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoItem } from '@/ui/components/DemoItem';
import { DemoPage } from '@/ui/components/DemoPage';

import './DisplayPage.css';

export const DisplayPage: Component = () => {
    const COMPONENT = findComponent('Display');

    return (
        <DemoPage classList={{ DisplayPage: true }} title="Display">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem>
                    <Display>Vitae elementum ipsum</Display>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="level">
                <DemoItem title="1">
                    <Display level={1}>Vitae elementum ipsum</Display>
                </DemoItem>
                <DemoItem title="2">
                    <Display level={2}>Tempor quis pellent faucibus</Display>
                </DemoItem>
                <DemoItem title="3">
                    <Display level={3}>Ipsum eu euismod accumsan</Display>
                </DemoItem>
                <DemoItem title="4">
                    <Display level={4}>Sapien consectetur purus ut</Display>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem title="xl">
                    <Display level={3} size="xl">
                        Vestibulum ultricies molestie tellus
                    </Display>
                </DemoItem>
                <DemoItem title="l">
                    <Display level={3} size="l">
                        Bibendum nisi erat dignissim leo
                    </Display>
                </DemoItem>
                <DemoItem title="m">
                    <Display level={3} size="m">
                        turpis quis nulla dapibus vulputate in a justo
                    </Display>
                </DemoItem>
                <DemoItem title="s">
                    <Display level={3} size="s">
                        Sed congue cursus diam at cursus
                    </Display>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="level + size">
                <DemoItem title="applies size">
                    <Display level={1} size="s">
                        Nam scelerisque, lectus sed pulvinar aliquet
                    </Display>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="tag">
                <DemoItem note="Should render a <p>">
                    <Display level={3} tag="p">
                        Duis fermentum faucibus est non semper nisl
                    </Display>
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
