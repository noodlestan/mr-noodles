import { UserModel } from '@noodlestan/shared-types';
import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { useBeforeLeave } from '@solidjs/router';
import { Component, Show, onMount } from 'solid-js';

import { UsersButtonList } from '@/molecules/UsersButtonList/UsersButtonList';
import { ModalView } from '@/organisms/ModalView/ModalView';
import { useCurrentUserContext } from '@/providers/CurrentUser';
import { createUsersResource } from '@/resources/User/createUsersResource';

import './HomeScreen.css';

export const HomeScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const { bus, currentUser } = useCurrentUserContext();

    const handleModalClose = () => {
        // navigationBus?.emit({ name: 'closeModal' });
    };

    const [users] = createUsersResource();

    const data = () => users()?.data || [];

    onMount(() => window.setTimeout(() => mainRef?.focus()));

    const handleUserClick = (user: UserModel) => {
        bus.emit({ name: 'selectUser', value: user });
    };

    useBeforeLeave(ev => {
        if (!currentUser()) {
            ev.preventDefault();
        }
    });

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <main tabindex="0" class="HomeScreen" ref={mainRef}>
            <Flex align="start" gap="l">
                <Display level={1}>Welcome</Display>
                <Show when={!users.loading}>
                    <UsersButtonList users={data()} onClick={handleUserClick} />
                </Show>
                <ModalView show={false} onClose={handleModalClose} />
            </Flex>
        </main>
    );
};
