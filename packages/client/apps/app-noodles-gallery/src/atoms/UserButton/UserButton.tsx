import { UserModel } from '@noodlestan/shared-types';
import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Component } from 'solid-js';

import { makeImageUrl } from '@/services/Images';

import './UserButton.css';

type UserButtonProps = {
    user: UserModel;
    onClick: (user: UserModel) => void;
};

export const UserButton: Component<UserButtonProps> = props => {
    const imageUrl = () => makeImageUrl('users', props.user, 'thumb.small');

    return (
        <button onClick={() => props.onClick(props.user)} class="UserButton">
            <Flex tag="span" direction="row" gap="m" padding="s" align="center">
                <img src={imageUrl()} alt="" />
                <Display level={2}>{props.user.name}</Display>
            </Flex>
        </button>
    );
};
