import { Link } from '@noodlestan/ui-atoms';
import { useSearchParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { BreadcrumbFolderIcon } from '@/atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';
import { useUrl } from '@/navigation/useUrl';

import './AlbumLink.css';

type AlbumLinkProps = {
    name: string;
    path: string;
    showIcon?: boolean;
    isOpen?: boolean;
};

export const AlbumLink: Component<AlbumLinkProps> = props => {
    const [searchParams] = useSearchParams();

    const url = () => {
        return useUrl(searchParams, `/folders/${props.path}`);
    };

    const classList = () => ({ AlbumLink: true });

    return (
        <>
            <Link href={url()} classList={classList()}>
                <Show when={props.showIcon}>
                    <BreadcrumbFolderIcon hasLink={true} isOpen={true} />
                </Show>
                <span class="AlbumLink--text">{props.name}</span>
            </Link>
        </>
    );
};
