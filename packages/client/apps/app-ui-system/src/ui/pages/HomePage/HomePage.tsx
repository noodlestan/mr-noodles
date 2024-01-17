import { Display, Link, Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component } from 'solid-js';

import {
    ExampleLargeBody,
    ExampleLargeFooter,
    ExampleLargeHeader,
} from '@/ui/components/ExampleLarge';
import { PageLayout } from '@/ui/components/PageLayout';

import './HomePage.css';

export const HomePage: Component = () => {
    return (
        <PageLayout classList={{ HomePage: true }}>
            <Surface variant="stage" classList={{ 'PageLayout--content': true }}>
                <Flex padding="l" gap="xl">
                    <Flex gap="xl">
                        <Flex gap="m">
                            <Display>Home</Display>
                            <Text size="l">Lorem ipsum dolor sit amet</Text>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur <Link href="#">Foobar</Link>{' '}
                                adipiscing elit. In sit amet tempor turpis. Pellentesque libero
                                enim, semper id sem a, gravida semper nisl. Duis fermentum faucibus
                                est non porta.
                            </Text>
                        </Flex>
                        <Flex gap="m" classList={{ 'HomePage--cards': true }}>
                            <Surface variant="card">
                                <Flex padding="m">
                                    <ExampleLargeHeader title="Lorem ipsum" nopadding />
                                </Flex>
                            </Surface>

                            <Surface variant="card">
                                <Flex padding="m">
                                    <ExampleLargeHeader title="Lorem ipsum" nopadding />
                                </Flex>
                            </Surface>
                        </Flex>
                    </Flex>

                    <ExampleLargeBody title="Lorem ipsum" nopadding />

                    <Text>
                        Lorem ipsum dolor sit amet, consectetur <Link href="#">Foobar</Link>{' '}
                        adipiscing elit. In sit amet tempor turpis. Pellentesque libero enim, semper
                        id sem a, gravida semper nisl. Duis fermentum faucibus est non porta.
                    </Text>

                    <ExampleLargeFooter title="Lorem ipsum" nopadding />
                </Flex>
            </Surface>
        </PageLayout>
    );
};
