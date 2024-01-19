import { Component, JSX } from 'solid-js';

import './GalleryScroll.css';

type GalleryScrollProps = {
    children: JSX.Element;
};

export const GalleryScroll: Component<GalleryScrollProps> = props => {
    return <div class="GalleryScroll">{props.children}</div>;
};
