import { Button, Display, Link, Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Component } from 'solid-js';

import './FoldersPlaceholder.css';

export const FoldersPlaceholder: Component = () => {
    return (
        <Flex classList={{ FoldersPlaceholder: true }} gap="xl">
            <Display level={2}>You don't have any folders yet</Display>
            <Text size="m">
                Add your first folder in your <Link href="/user/settings">personal settings</Link>.
            </Text>
            <Flex direction="row" justify="start">
                <Button variant="primary" href="/user/settings">
                    Add folders.
                </Button>
            </Flex>
        </Flex>
    );
};
