import { Link } from '@noodlestan/ui-atoms';
import { Component, Show } from 'solid-js';

import { BreadcrumbFolderIcon } from '@/ui/atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';

import './AlbumLink.css';

type AlbumLinkProps = {
    name: string;
    path: string;
    showIcon?: boolean;
    isOpen?: boolean;
};

export const AlbumLink: Component<AlbumLinkProps> = props => {
    const url = () => {
        return `/albums/${props.path}${window.location.search}`;
    };

    const classList = () => ({ AlbumLink: true });

    return (
        <>
            <Link href={url()} classList={classList()}>
                <Show when={props.showIcon}>
                    <BreadcrumbFolderIcon hasLink={true} isOpen={true} />
                </Show>
                {props.name}
            </Link>
        </>
    );
};
