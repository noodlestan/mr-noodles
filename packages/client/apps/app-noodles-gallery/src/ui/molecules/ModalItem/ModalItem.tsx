import { PhotoData } from '@noodlestan/shared-types';
import { Component } from 'solid-js';

import { makeImageUrl } from '@/ui/services/Images';

import './ModalItem.css';

export type ModalItemProps = {
    item: PhotoData;
    onClick: () => void;
};

export const ModalItem: Component<ModalItemProps> = props => {
    const classList = () => ({
        ModalItem: true,
    });

    const url = () => makeImageUrl(props.item, 1600);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div classList={classList()} onMouseDown={() => props.onClick()}>
            <div class="ModalItem--frame">
                <img alt="" src={url()} />
            </div>
        </div>
    );
};
