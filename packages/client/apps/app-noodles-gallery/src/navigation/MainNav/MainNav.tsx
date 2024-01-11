import { Button, Icon } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { useLocation } from '@solidjs/router';
import { Calendar, Folder, HomeIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import './MainNav.css';

type MainNavButtonProps = {
    href: string;
    label: string;
    icon: Component;
};

const MainNavButton: Component<MainNavButtonProps> = props => {
    const location = useLocation();

    const classList = () => {
        const isActive = location.pathname.startsWith(props.href) || false;
        return {
            MainNavButton: true,
            'MainNavButton-is-active': isActive,
        };
    };

    return (
        <Button size="m" variant="plain" href={props.href} classList={classList()}>
            <Icon icon={props.icon} size="m" />
            <span>{props.label}</span>
        </Button>
    );
};

export const MainNav: Component = () => {
    return (
        <Flex padding="s" gap="xl" justify="start" align="start" classList={{ MainNav: true }}>
            <Button size="m" variant="plain" href="/">
                <Icon icon={HomeIcon} size="m" /> Noodlestan
            </Button>
            <Flex gap="s" justify="start" align="start">
                <MainNavButton href="/folders" icon={Folder} label="Folders" />
                <MainNavButton href="/timeline" icon={Calendar} label="Timeline" />
            </Flex>
        </Flex>
    );
};
