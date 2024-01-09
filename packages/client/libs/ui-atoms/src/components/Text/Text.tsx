import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import './Text.css';

export type TextSize = 'xs' | 's' | 'm' | 'l';

export type TextProps = {
    size?: TextSize;
    tag?: string;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<TextProps, 'size' | 'tag'> = {
    size: 's',
    tag: 'p',
};

export const Text: Component<TextProps> = props => {
    const size = () => props.size ?? defaultProps.size;
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        ...props.classList,
        Text: true,
        [`Text-size-${size()}`]: true,
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
