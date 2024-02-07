import { Button, Display, Icon, IconButton, Label, Link, Text } from '@noodlestan/ui-atoms';
import { TextInput } from '@noodlestan/ui-forms';
import { Flex } from '@noodlestan/ui-layouts';
import { LockIcon, UnlockIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import './ExampleMedium.css';

type ExampleMediumProps = { title: string };

export const ExampleMedium: Component<ExampleMediumProps> = props => (
    <Flex gap="l" padding="l" classList={{ ExampleSmall: true }}>
        <Flex gap="m">
            <Flex direction="row" align="center">
                <Icon size="s" icon={LockIcon} />
                <Display level={3}>{props.title}</Display>
            </Flex>
        </Flex>
        <Flex gap="s">
            <Label size="s">Password</Label>
            <TextInput size="s" length="m" value="password" type="password" />
        </Flex>
        <Flex direction="row" gap="m" align="center">
            <IconButton variant="primary" icon={LockIcon} />
            <IconButton variant="secondary" icon={UnlockIcon} />
            <Button variant="plain">Plain</Button>
        </Flex>
        <Text>
            Lorem ipsum dolor sit amet <Link href="#">Foobar</Link> elit. Nops{' '}
            <Link href="#" disabled>
                Nops
            </Link>{' '}
            nops!.
        </Text>
    </Flex>
);
