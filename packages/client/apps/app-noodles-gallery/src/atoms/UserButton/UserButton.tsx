import type { UserNoodle } from '@noodlestan/shared-types';
import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Component } from 'solid-js';

import { makeImageUrl } from '@/services/Images';

import './UserButton.css';

type UserButtonProps = {
    user: UserNoodle;
    onClick: (user: UserNoodle) => void;
};

export const UserButton: Component<UserButtonProps> = props => {
    const imageUrl = () => makeImageUrl('user', props.user, 'thumb.small');

    return (
        <button onClick={() => props.onClick(props.user)} class="UserButton">
            <Flex tag="span" direction="row" gap="l" padding="s" align="center">
                <div class="UserButton--image">
                    <img src={imageUrl()} alt="" />
                </div>
                <Display level={2}>{props.user.name}</Display>
            </Flex>
        </button>
    );
};
