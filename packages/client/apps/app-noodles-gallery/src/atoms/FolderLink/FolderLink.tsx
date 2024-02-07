import { Link } from '@noodlestan/ui-atoms';
import { useSearchParams } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { BreadcrumbFolderIcon } from '@/atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';
import { useUrl } from '@/navigation/useUrl';

import './FolderLink.css';

type FolderLinkProps = {
    title: string;
    root: string;
    filename: string;
    showIcon?: boolean;
    isOpen?: boolean;
};

export const FolderLink: Component<FolderLinkProps> = props => {
    const [searchParams] = useSearchParams();

    const url = () => {
        return useUrl(searchParams, `/folders/${props.root}${props.filename}`);
    };

    const classList = () => ({ FolderLink: true });

    return (
        <>
            <Link href={url()} classList={classList()}>
                <Show when={props.showIcon}>
                    <BreadcrumbFolderIcon
                        hasLink={true}
                        isOpen={true}
                        isRoot={props.filename === '/'}
                    />
                </Show>
                <span class="FolderLink--Text">{props.title}</span>
            </Link>
        </>
    );
};
