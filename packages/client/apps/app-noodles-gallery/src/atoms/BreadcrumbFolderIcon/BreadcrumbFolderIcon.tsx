import { Icon } from '@noodlestan/ui-atoms';
import { BriefcaseIcon, FolderIcon, FolderOpenIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import './BreadcrumbFolderIcon.css';

type BreadcrumbFolderIconProps = {
    hasLink?: boolean;
    isOpen?: boolean;
    isRoot?: boolean;
};
export const BreadcrumbFolderIcon: Component<BreadcrumbFolderIconProps> = props => {
    const classList = () => ({
        BreadcrumbFolderIcon: true,
        'BreadcrumbFolderIcon-has-link': props.hasLink,
        'BreadcrumbFolderIcon-is-open': props.isOpen,
        'BreadcrumbFolderIcon-is-root': props.isRoot,
    });
    return (
        <span classList={classList()}>
            <Icon icon={props.isRoot ? BriefcaseIcon : FolderIcon} />
            <Icon icon={props.isRoot ? BriefcaseIcon : FolderOpenIcon} />
        </span>
    );
};
