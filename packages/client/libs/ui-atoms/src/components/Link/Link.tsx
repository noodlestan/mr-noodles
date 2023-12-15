import { Component, JSX } from 'solid-js';

import './Link.css';

export type LinkProps = {
    href?: string;
    onClick?: () => void;
    onTap?: () => void;
    disabled?: boolean;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

export const Link: Component<LinkProps> = props => {
    const classList = () => ({
        ...props.classList,
        Link: true,
        [`Link-is-disabled`]: props.disabled,
    });

    const handleClick = () => {
        if (!props.disabled) {
            props.onClick?.();
        }
    };

    const handleTap = () => {
        if (!props.disabled) {
            props.onTap?.();
        }
    };

    const handleMouseDown = () => {
        if (!props.disabled) {
            props.onTap?.();
        }
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' && !props.disabled) {
            props.onTap?.();
        }
    };

    const handleKeyPress = (ev: KeyboardEvent) => {
        ev.preventDefault();
        if (!props.onTap && ev.key === 'Enter' && !props.disabled) {
            props.onClick?.();
        }
    };

    return (
        <a
            href={props.href}
            tabindex="0"
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTap}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            classList={classList()}
        >
            {props.children}
        </a>
    );
};
