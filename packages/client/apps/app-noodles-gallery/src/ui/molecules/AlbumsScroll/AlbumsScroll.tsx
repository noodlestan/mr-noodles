import { Component, JSX } from 'solid-js';

import './AlbumsScroll.css';

type GalleryScreenProps = {
    children: JSX.Element;
};

export const AlbumsScroll: Component<GalleryScreenProps> = props => {
    return <div class="AlbumsScroll">{props.children}</div>;
};
