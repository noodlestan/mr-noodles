import { Icon } from '@noodlestan/ui-atoms';
import { ClockIcon } from 'lucide-solid';
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
                    <Icon icon={ClockIcon} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem title="l">
                    <Icon icon={ClockIcon} size="l" />
                </DemoItem>
                <DemoItem title="m">
                    <Icon icon={ClockIcon} size="m" />
                </DemoItem>
                <DemoItem title="s">
                    <Icon icon={ClockIcon} size="s" />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="recoloring">
                <div class="IconPage--recoloring">
                    <Icon icon={ClockIcon} size="s" />
                </div>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem note="Should override icon color">
                    <Icon icon={ClockIcon} classList={{ override: true }} />
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
