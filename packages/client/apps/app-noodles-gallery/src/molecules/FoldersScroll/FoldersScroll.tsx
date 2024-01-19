import { Component, JSX } from 'solid-js';

import './FoldersScroll.css';

type FoldersScrollProps = {
    children: JSX.Element;
};

export const FoldersScroll: Component<FoldersScrollProps> = props => {
    return <div class="FoldersScroll">{props.children}</div>;
};
