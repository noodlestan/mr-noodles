import type { UserNoodle } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { FadeIn } from '@noodlestan/ui-transitions';
import { Component, For, createEffect, createSignal } from 'solid-js';

import { UserButton } from '@/atoms/UserButton/UserButton';

import './UsersButtonList.css';

type UsersButtonListProps = {
    users: UserNoodle[];
    onClick: (user: UserNoodle) => void;
};

// const makeStaggered = (items: Accessor<unknown[]>) => {
//     return [items()[0]];
// };

const STAGGER_MS = 33;

export const UsersButtonList: Component<UsersButtonListProps> = props => {
    const [staggered, setStaggred] = createSignal<UserNoodle[]>([]);

    createEffect(() => {
        const current = staggered();
        if (props.users.length > current?.length) {
            setTimeout(() => {
                setStaggred(s => props.users.slice(0, s.length + 1));
            }, STAGGER_MS);
        }
    });

    return (
        <Flex gap="s" classList={{ UsersButtonList: true }}>
            <For each={staggered()}>
                {user => (
                    <FadeIn speed="fast">
                        <UserButton user={user} onClick={props.onClick} />
                    </FadeIn>
                )}
            </For>
        </Flex>
    );
};
