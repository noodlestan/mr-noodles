import { Component, JSX } from 'solid-js';

import './GalleryScroll.css';

type GalleryScreenProps = {
    children: JSX.Element;
};

export const GalleryScroll: Component<GalleryScreenProps> = props => {
    return <div class="GalleryScroll">{props.children}</div>;
};
