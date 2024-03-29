import { Button, Display, Icon, Link, Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { ClockIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import './ExampleSmall.css';

type ExampleSmallProps = { title: string };

export const ExampleSmall: Component<ExampleSmallProps> = props => (
    <Flex direction="column" gap="l" padding="m" classList={{ ExampleSmall: true }}>
        <Flex gap="m">
            <Flex direction="row" align="center" gap="s">
                <Icon size="s" icon={ClockIcon} />
                <Display level={3}>{props.title}</Display>
            </Flex>
            <Text>
                Lorem ipsum dolor sit amet <Link href="#">Foobar</Link> elit.
            </Text>
        </Flex>
        <Flex direction="row" align="center" justify="end" gap="l">
            <Button variant="secondary">Secondary</Button>
            <Button variant="plain">Plain</Button>
        </Flex>
    </Flex>
);
