import { Component, Show } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';

import './SkeletonText.css';

export type SkeletonTextSize = 'xs' | 's' | 'm' | 'l';

export type SkeletonTextProps = {
    size?: SkeletonTextSize;
    tag?: string;
    children?: JSX.Element;
};

const defaultProps: Pick<SkeletonTextProps, 'size' | 'tag'> = {
    size: 's',
    tag: 'span',
};

export const SkeletonText: Component<SkeletonTextProps> = props => {
    const size = () => props.size ?? defaultProps.size;
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        SkeletonText: true,
        [`SkeletonText-size-${size()}`]: true,
    });

    return (
        <>
            <Show when={!props.children}>
                <Dynamic component={tag()} classList={classList()}>
                    <span class="SkeletonText--highlight">&nbsp;</span>
                </Dynamic>
            </Show>
            <Show when={props.children}>{props.children}</Show>
        </>
    );
};
