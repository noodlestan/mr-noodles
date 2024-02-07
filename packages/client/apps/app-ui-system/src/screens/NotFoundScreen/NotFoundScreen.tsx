import { Display, Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component } from 'solid-js';

import { PageLayout } from '@/components/PageLayout';

export const NotFoundScreen: Component = () => {
    return (
        <PageLayout classList={{ NotFoundScreen: true }}>
            <Surface variant="stage" classList={{ 'PageLayout--Content': true }}>
                <Flex padding="l" gap="xl">
                    <Flex gap="xl">
                        <Flex gap="m">
                            <Display>404</Display>
                            <Text size="l">Not found</Text>
                            <Text>The requested page could not be found.</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Surface>
        </PageLayout>
    );
};
