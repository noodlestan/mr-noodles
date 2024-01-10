import { Button, Icon } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Calendar, Folder, HomeIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import './MainNav.css';

export const MainNav: Component = () => {
    return (
        <Flex padding="s" gap="xl" justify="start" align="start" classList={{ MainNav: true }}>
            <Button size="m" variant="plain" href="/">
                <Icon icon={HomeIcon} size="m" /> Noodlestan
            </Button>
            <Flex gap="s" justify="start" align="start">
                <Button size="m" variant="plain" href="/albums">
                    <Icon icon={Folder} size="m" /> Folders
                </Button>
                <Button size="m" variant="plain" href="/gallery">
                    <Icon icon={Calendar} size="m" /> Timeline
                </Button>
            </Flex>
        </Flex>
    );
};
