import { Component, JSX } from 'solid-js';

import './FoldersScroll.css';

type GalleryScreenProps = {
    children: JSX.Element;
};

export const FoldersScroll: Component<GalleryScreenProps> = props => {
    return <div class="FoldersScroll">{props.children}</div>;
};
