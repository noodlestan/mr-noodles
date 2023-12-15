import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { FlexAlign, FlexDirection, FlexGap, FlexJustify, FlexPadding } from './types';

import './Flex.css';

export type FlexProps = {
    tag?: string;
    direction?: FlexDirection;
    align?: FlexAlign;
    justify?: FlexJustify;
    gap?: FlexGap;
    padding?: FlexPadding;
    inline?: boolean;
    wrap?: boolean;
    full?: boolean;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

const defaultProps: Pick<FlexProps, 'tag' | 'direction' | 'align' | 'justify' | 'gap' | 'padding'> =
    {
        tag: 'div',
        direction: 'column',
        align: 'stretch',
        justify: 'start',
        gap: 'none',
        padding: 'none',
    };

export const Flex: Component<FlexProps> = props => {
    const tag = () => props.tag || defaultProps.tag;
    const direction = () => props.direction ?? defaultProps.direction;
    const align = () => props.align ?? defaultProps.align;
    const justify = () => props.justify ?? defaultProps.justify;
    const gap = () => props.gap ?? defaultProps.gap;
    const padding = () => props.padding ?? defaultProps.padding;

    const classList = () => ({
        ...props.classList,
        Flex: true,
        'Flex--inline': props.inline,
        'Flex--full': props.full,
        'Flex--wrap': props.wrap,
        [`Flex--direction-${direction()}`]: true,
        [`Flex--align-${align()}`]: true,
        [`Flex--justify-${justify()}`]: true,
        [`Flex--gap-${gap()}`]: true,
        [`Flex--padding-${padding()}`]: true,
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
