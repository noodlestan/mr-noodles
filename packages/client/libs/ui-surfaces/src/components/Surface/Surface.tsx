import { SurfaceProvider } from '@noodlestan/ui-themes';
import { Component, JSX, createSignal } from 'solid-js';

import './Surface.css';

export type SurfaceProps = {
    variant: string;
    tag?: string;
    onClick?: () => void;
    onTap?: () => void;
    disabled?: boolean;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<SurfaceProps, 'tag'> = {
    tag: 'div',
};

export const Surface: Component<SurfaceProps> = props => {
    const [isActive, setIsActive] = createSignal(false);

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        setIsActive(false);
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter') {
            props.onTap?.();
        }
    };

    const handleKeyPress = (ev: KeyboardEvent) => {
        if (!props.onTap && ev.key === 'Enter') {
            props.onClick?.();
        }
    };

    const tabindex = () => (props.onClick || props.onTap ? 0 : undefined);
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        ...props.classList,
        Surface: true,
        'Surface-is-interactive': !!tabindex(),
        'Surface-is-active': isActive(),
        'Surface-is-disabled': !!props.disabled,
    });

    return (
        <SurfaceProvider
            surface={props.variant}
            tag={tag()}
            onClick={props.onClick}
            onMouseDown={props.onTap}
            onTouchStart={props.onTap}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabindex={tabindex()}
            classList={classList()}
        >
            {props.children}
        </SurfaceProvider>
    );
};
