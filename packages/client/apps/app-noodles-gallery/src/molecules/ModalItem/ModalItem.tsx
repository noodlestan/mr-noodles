import type { ImageNoodle } from '@noodlestan/shared-types';
import { Component } from 'solid-js';

import { makeImageUrl } from '@/services/Images';

import './ModalItem.css';

export type ModalItemProps = {
    item: ImageNoodle;
    onClick: () => void;
};

export const ModalItem: Component<ModalItemProps> = props => {
    const classList = () => ({
        ModalItem: true,
    });

    const url = () => makeImageUrl('file', props.item, 'full.fast');

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div classList={classList()} onMouseDown={() => props.onClick()}>
            <div class="ModalItem--Frame">
                <img alt="" src={url()} />
            </div>
        </div>
    );
};
