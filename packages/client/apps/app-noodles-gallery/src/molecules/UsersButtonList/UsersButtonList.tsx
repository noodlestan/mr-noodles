import { UserModel } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Component, For } from 'solid-js';

import { UserButton } from '@/atoms/UserButton/UserButton';

type UsersButtonListProps = {
    users: UserModel[];
    onClick: (user: UserModel) => void;
};

export const UsersButtonList: Component<UsersButtonListProps> = props => {
    return (
        <Flex gap="m">
            <For each={props.users}>
                {user => <UserButton user={user} onClick={props.onClick} />}
            </For>
        </Flex>
    );
};
