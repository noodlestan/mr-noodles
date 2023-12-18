import { Text } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { findComponent } from '@/data/components';
import { ComponentMeta } from '@/ui/components/ComponentMeta';
import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoItem } from '@/ui/components/DemoItem';
import { DemoPage } from '@/ui/components/DemoPage';

import './TextPage.css';

export const TextPage: Component = () => {
    const COMPONENT = findComponent('Text');

    return (
        <DemoPage classList={{ TextPage: true }} title="Text">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem title="l">
                    <Text size="l">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                </DemoItem>
                <DemoItem title="m">
                    <Text size="m">
                        Sed tristique lectus dui, vitae viverra sapien semper a. In ut consectetur
                        nibh, eget posuere mauris. Suspendisse hendrerit quam tortor.
                    </Text>
                </DemoItem>
                <DemoItem title="s">
                    <Text size="s">
                        In sit amet tempor turpis. Pellentesque libero enim, semper id sem a,
                        gravida semper nisl. Duis fermentum faucibus est non porta. Nam scelerisque,
                        lectus sed pulvinar aliquet, nulla erat rutrum metus, a interdum arcu quam
                        vitae tellus. Proin aliquam orci at nunc egestas tempor. Donec vel ipsum
                        augue.
                    </Text>
                </DemoItem>
                <DemoItem title="xs">
                    <Text size="xs">
                        Vestibulum ultricies molestie tellus, vitae elementum ipsum tempor quis.
                        Pellentesque faucibus, ipsum eu euismod accumsan, ipsum sapien.
                    </Text>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="tag">
                <DemoItem note="Should render a <p>">
                    <Text tag="p">Foobar</Text>
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};
