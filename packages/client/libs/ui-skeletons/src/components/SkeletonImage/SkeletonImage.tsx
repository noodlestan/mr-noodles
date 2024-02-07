import { Component, Show } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';

import './SkeletonImage.css';

export type SkeletonImageProps = {
    tag?: string;
    width?: string;
    height?: string;
    children?: JSX.Element;
};

const defaultProps: Pick<SkeletonImageProps, 'width' | 'height' | 'tag'> = {
    width: '200px',
    height: '200px',
    tag: 'span',
};

export const SkeletonImage: Component<SkeletonImageProps> = props => {
    const width = () => props.width ?? defaultProps.width;
    const height = () => props.height ?? defaultProps.height;
    const tag = () => props.tag || defaultProps.tag;

    const classList = () => ({
        SkeletonImage: true,
    });

    const style = () => ({
        width: width(),
        height: height(),
    });

    return (
        <>
            <Show when={!props.children}>
                <Dynamic component={tag()} classList={classList()} style={style()}>
                    <span class="SkeletonImage--Highlight">&nbsp;</span>
                </Dynamic>
            </Show>
            <Show when={props.children}>{props.children}</Show>
        </>
    );
};
