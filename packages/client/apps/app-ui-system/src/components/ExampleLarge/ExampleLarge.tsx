import { Button, Display, Icon, IconButton, Label, Link, Text } from '@noodlestan/ui-atoms';
import { TextInput } from '@noodlestan/ui-forms';
import { Flex } from '@noodlestan/ui-layouts';
import { ClockIcon, LockIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import './ExampleLarge.css';

type ExampleLargeProps = {
    title: string;
    nopadding?: boolean;
};

export const ExampleLargeHeader: Component<ExampleLargeProps> = props => (
    <Flex gap="s">
        <Flex direction="row" align="center" gap="m">
            <Icon size="m" icon={LockIcon} />
            <Display level={3}>{props.title}</Display>
        </Flex>
        <Text>
            Lorem ipsum dolor sit amet, consectetur <Link href="#">Foobar</Link> adipiscing elit. In
            sit amet tempor turpis. Pellentesque libero enim, semper id sem a, gravida semper nisl.
            Duis fermentum faucibus est non porta.
        </Text>
    </Flex>
);

export const ExampleLargeBody: Component<ExampleLargeProps> = () => (
    <Flex gap="m">
        <Flex gap="m" direction="row" justify="between">
            <Display level={3}>Lorem ipsum dolor</Display>
            <IconButton variant="secondary" icon={LockIcon} />
        </Flex>
        <Flex gap="xl">
            <Flex gap="l">
                <Flex gap="s">
                    <Label>Username</Label>
                    <TextInput value="username" />
                </Flex>
                <Flex gap="s">
                    <Label>Password</Label>
                    <TextInput value="password" type="password" />
                </Flex>
            </Flex>
            <Flex direction="row" gap="m">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
            </Flex>
        </Flex>
    </Flex>
);

export const ExampleLargeFooter: Component<ExampleLargeProps> = () => (
    <Flex direction="row" align="center" gap="l">
        <Flex direction="row" align="center" gap="s">
            <Icon size="s" icon={ClockIcon} />
            <Text>Lorem ipsum dolor sit amet</Text>
            <Button size="s" variant="plain">
                Plain
            </Button>
        </Flex>
    </Flex>
);

export const ExampleLarge: Component<ExampleLargeProps> = props => (
    <Flex
        direction="column"
        gap="l"
        padding={props.nopadding ? 'none' : 'xl'}
        classList={{ ExampleLarge: true }}
    >
        <ExampleLargeHeader {...props} />
        <ExampleLargeBody {...props} />
        <ExampleLargeFooter {...props} />
    </Flex>
);
