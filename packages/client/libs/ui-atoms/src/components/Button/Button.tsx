import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'plain' | 'danger';
type ButtonSize = 's' | 'm' | 'l';
type ButtonLength = 's' | 'm' | 'l' | 'full' | 'auto';

export type ButtonProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    length?: number | ButtonLength;
    disabled?: boolean;
    onClick?: () => void;
    onTap?: () => void;
    classList?: { [key: string]: boolean };
    label?: string;
    href?: string;
    children?: JSX.Element;
};

const defaultProps: Pick<ButtonProps, 'variant' | 'size' | 'length'> = {
    variant: 'primary',
    size: 'm',
    length: 'auto',
};

const makeLength = (length: number | ButtonLength): string => {
    if (typeof length === 'number') {
        return `${length}em`;
    }
    if (length === 'auto') {
        return 'auto';
    }
    if (length === 'full') {
        return '100%';
    }
    return `var(--button-length-${length})`;
};

const makeStyle = (length?: number | ButtonLength) =>
    length ? { '--button-length': makeLength(length) } : {};

export const Button: Component<ButtonProps> = props => {
    const variant = () => props.variant || defaultProps.variant;
    const size = () => props.size || defaultProps.size;
    const length = () => props.length || defaultProps.length;
    const tag = () => (props.href ? 'a' : 'button');
    const style = () => makeStyle(length());

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter') {
            if (tag() === 'a') {
                props.onClick?.();
            }
            props.onTap?.();
        }
    };

    const handleKeyPress = (ev: KeyboardEvent) => {
        ev.preventDefault();
        if (!props.onTap && ev.key === 'Enter') {
            props.onClick?.();
        }
    };

    const classList = () => ({
        ...props.classList,
        Button: true,
        'Button-is-disabled': props.disabled,
        [`Button-size-${size()}`]: true,
        [`Button-variant-${variant()}`]: true,
    });

    return (
        <Dynamic
            component={tag()}
            aria-label={props.label}
            disabled={props.disabled}
            onClick={() => props.onClick && props.onClick()}
            onMouseDown={() => props.onTap && props.onTap()}
            onTouchStart={() => props.onTap && props.onTap()}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            classList={classList()}
            style={style()}
            href={props.href}
        >
            {props.children}
        </Dynamic>
    );
};
