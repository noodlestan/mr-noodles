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

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter') {
            handleTap();
        }
    };

    return (
        <a
            href={props.href}
            tabindex="0"
            onClick={handleClick}
            onMouseDown={handleTap}
            onTouchStart={handleTap}
            onKeyDown={handleKeyDown}
            classList={classList()}
        >
            {props.children}
        </a>
    );
};
