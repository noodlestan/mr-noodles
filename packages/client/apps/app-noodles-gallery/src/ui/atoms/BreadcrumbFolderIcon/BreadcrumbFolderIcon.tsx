import { Icon } from '@noodlestan/ui-atoms';
import { Folder, FolderOpen } from 'lucide-solid';
import { Component } from 'solid-js';

import './BreadcrumbFolderIcon.css';

type BreadcrumbFolderIconProps = {
    hasLink?: boolean;
    isOpen?: boolean;
};
export const BreadcrumbFolderIcon: Component<BreadcrumbFolderIconProps> = props => {
    const classList = () => ({
        BreadcrumbFolderIcon: true,
        'BreadcrumbFolderIcon-has-link': props.hasLink,
        'BreadcrumbFolderIcon-is-open': props.isOpen,
    });
    return (
        <span classList={classList()}>
            <Icon icon={Folder} />
            <Icon icon={FolderOpen} />
        </span>
    );
};
