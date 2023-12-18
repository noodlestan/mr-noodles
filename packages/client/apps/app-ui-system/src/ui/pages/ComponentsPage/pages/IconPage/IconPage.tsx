import { Icon } from '@noodlestan/ui-atoms';
import InfoSvg from '@noodlestan/ui-icons/src/assets/icons/info.svg';
import { Component } from 'solid-js';

import { findComponent } from '@/data/components';
import { ComponentMeta } from '@/ui/components/ComponentMeta';
import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoItem } from '@/ui/components/DemoItem';
import { DemoPage } from '@/ui/components/DemoPage';

import './IconPage.css';

export const IconPage: Component = () => {
    const COMPONENT = findComponent('Icon');

    return (
        <DemoPage classList={{ IconPage: true }} title="Icon">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem>
                    <Icon svg={InfoSvg} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem title="l">
                    <Icon svg={InfoSvg} size="l" />
                </DemoItem>
                <DemoItem title="m">
                    <Icon svg={InfoSvg} size="m" />
                </DemoItem>
                <DemoItem title="s">
                    <Icon svg={InfoSvg} size="s" />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="recoloring">
                <div class="IconPage--recoloring">
                    <Icon svg={InfoSvg} size="s" />
                </div>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem note="Should override icon color">
                    <Icon svg={InfoSvg} classList={{ override: true }} />
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
