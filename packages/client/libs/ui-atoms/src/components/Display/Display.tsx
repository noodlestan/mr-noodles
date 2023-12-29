import { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import './Display.css';

type DisplayLevel = 1 | 2 | 3 | 4;
type DisplaySize = 's' | 'm' | 'l' | 'xl';

export type DisplayProps = {
    level?: DisplayLevel;
    size?: DisplaySize;
    tag?: string;
    children?: JSX.Element;
};

const MAP_LEVEL_TO_SIZE: Record<DisplayLevel, DisplaySize> = {
    1: 'xl',
    2: 'l',
    3: 'm',
    4: 's',
};

const MAP_LEVEL_TO_TAG: Record<DisplayLevel, string> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
};

const sizeFromLevel = (level: DisplayLevel): DisplaySize => MAP_LEVEL_TO_SIZE[level];

const defaultProps: Pick<DisplayProps, 'level' | 'size'> & { level: DisplayLevel } = {
    size: 's',
    level: 1,
};

export const Display: Component<DisplayProps> = props => {
    const level = () => props.level ?? defaultProps.level;
    const size = () => props.size ?? sizeFromLevel(level() || defaultProps.level);
    const tag = () => props.tag || MAP_LEVEL_TO_TAG[level() || defaultProps.level];

    const classList = () => ({
        Display: true,
        [`Display-size-${size()}`]: true,
    });

    return (
        <Dynamic component={tag()} classList={classList()}>
            {props.children}
        </Dynamic>
    );
};
