import { Button, Icon } from '@noodlestan/ui-atoms';
import { useLocation } from '@solidjs/router';
import { Component } from 'solid-js';

import './MainNavButton.css';

export type MainNavButtonProps = {
    href?: string;
    onClick?: () => void;
    label: string;
    icon: Component;
};

export const MainNavButton: Component<MainNavButtonProps> = props => {
    const location = useLocation();

    const classList = () => {
        const isActive = (props.href && location.pathname.startsWith(props.href)) || false;
        return {
            MainNavButton: true,
            'MainNavButton-is-active': isActive,
        };
    };

    return (
        <Button
            size="m"
            variant="plain"
            href={props.href}
            classList={classList()}
            onClick={props.onClick}
        >
            <Icon icon={props.icon} size="m" />
            {/* <span>{props.label}</span> */}
        </Button>
    );
};
