import { UserModel } from '@noodlestan/shared-types';
import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { FadeIn } from '@noodlestan/ui-transitions';
import { Squeeze } from '@noodlestan/ui-transitions/src/components/Squeeze';
import { useBeforeLeave } from '@solidjs/router';
import { Component, Show, onMount } from 'solid-js';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { UserBar } from '@/molecules/UserBar/UserBar';
import { UsersButtonList } from '@/molecules/UsersButtonList/UsersButtonList';
import { ModalView } from '@/organisms/ModalView/ModalView';
import { useCurrentUserContext } from '@/providers/CurrentUser';
import { UsersService } from '@/services/Users';

import './HomeScreen.css';

export const HomeScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const { bus, currentUser } = useCurrentUserContext();

    const handleModalClose = () => {
        // navigationBus?.emit({ name: 'closeModal' });
    };

    const { users } = inject(UsersService);

    onMount(() => window.setTimeout(() => mainRef?.focus()));

    const handleUserClick = (user: UserModel) => {
        bus.emit({ name: 'selectUser', value: user });
    };

    useBeforeLeave(ev => {
        if (!currentUser()) {
            ev.preventDefault();
        }
    });

    const appReady = () => !!users().length;

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <main tabindex="0" class="HomeScreen" ref={mainRef}>
            <Surface variant="stage">
                <Squeeze when={!!currentUser()} delay={100}>
                    <Flex align="center" justify="start" gap="xl" padding="s">
                        <Display level={1}>Welcome</Display>
                        <FadeIn when={!!users().length}>
                            <UsersButtonList users={users()} onClick={handleUserClick} />
                        </FadeIn>
                    </Flex>
                </Squeeze>
                <Spinner speed="slow" size="l" when={!appReady()} />
                <Show when={appReady() && !!currentUser()}>
                    <FadeIn>
                        <UserBar />
                    </FadeIn>
                </Show>
                <ModalView show={false} onClose={handleModalClose} />
            </Surface>
        </main>
    );
};
