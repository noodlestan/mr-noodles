import { Text } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { DemoPage } from '@/components/DemoPage';

export const ComponentsHomePage: Component = () => {
    return (
        <DemoPage classList={{ ComponentsHomePage: true }} title="Components">
            <Text size="l">
                Sed tristique lectus dui, vitae viverra sapien semper a. In ut consectetur nibh,
                eget posuere mauris. Suspendisse hendrerit quam tortor.
            </Text>
        </DemoPage>
    );
};
