import { Banner, BannerMessage, BannerProps, Button } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { ComponentMeta } from '@/components/ComponentMeta';
import { DemoGroup } from '@/components/DemoGroup';
import { DemoItem } from '@/components/DemoItem';
import { DemoPage } from '@/components/DemoPage';
import { findComponent } from '@/data/components';

import './BannerPage.css';

const BannerContents: Component<BannerProps> = props => (
    <BannerMessage
        button={
            <Button variant="secondary" size={props.size}>
                Click
            </Button>
        }
        size={props.size}
    >
        Lorem ipsum dolor sit amet!
    </BannerMessage>
);

export const BannerPage: Component = () => {
    const COMPONENT = findComponent('Banner');

    return (
        <DemoPage classList={{ BannerPage: true }} title="Banner">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem>
                    <Banner>
                        <BannerContents />
                    </Banner>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="variant">
                <DemoItem title="passive">
                    <Banner variant="passive">
                        <BannerContents />
                    </Banner>
                </DemoItem>
                <DemoItem title="info">
                    <Banner variant="info">
                        <BannerContents />
                    </Banner>
                </DemoItem>
                <DemoItem title="warning">
                    <Banner variant="warning">
                        <BannerContents />
                    </Banner>
                </DemoItem>
                <DemoItem title="danger">
                    <Banner variant="danger">
                        <BannerContents />
                    </Banner>
                </DemoItem>
                <DemoItem title="success">
                    <Banner variant="success">
                        <BannerContents />
                    </Banner>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem title="m">
                    <Banner size="m">
                        <BannerContents size="m" />
                    </Banner>
                </DemoItem>
                <DemoItem title="s">
                    <Banner size="s">
                        <BannerContents size="s" />
                    </Banner>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="length">
                <DemoItem title="full">
                    <Banner length="full">
                        <BannerContents />
                    </Banner>
                </DemoItem>
                <DemoItem title="compact">
                    <Banner length="compact">
                        <BannerContents />
                    </Banner>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem note="Should override border, background, and text color">
                    <Banner classList={{ override: true }}>
                        <BannerContents />
                    </Banner>
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
