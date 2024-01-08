import { IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Calendar, Folder, HomeIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import './MainNav.css';

export const MainNav: Component = () => {
    return (
        <Flex padding="s" gap="m" classList={{ MainNav: true }} align="center">
            <IconButton icon={HomeIcon} size="m" variant="plain" href="/" />
            <IconButton icon={Folder} size="m" variant="plain" href="/albums" />
            <IconButton icon={Calendar} size="m" variant="plain" href="/gallery" />
        </Flex>
    );
};
