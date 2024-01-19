import type { UserNoodle } from '@noodlestan/shared-types';
import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { FadeIn } from '@noodlestan/ui-transitions';
import { useBeforeLeave } from '@solidjs/router';
import { Component, onMount } from 'solid-js';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { UsersButtonList } from '@/molecules/UsersButtonList/UsersButtonList';
import { useCurrentUserContext } from '@/providers/CurrentUser';
import { AppService } from '@/services/App';
import { UsersService } from '@/services/Users';

import './WelcomePage.css';

export const WelcomePage: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const { bus, currentUser } = useCurrentUserContext();

    const { users } = inject(UsersService);
    const { ready } = inject(AppService);

    onMount(() => window.setTimeout(() => mainRef?.focus()));

    const handleUserClick = (user: UserNoodle) => {
        bus.emit({ name: 'setCurrentUserId', value: user.id });
    };

    useBeforeLeave(ev => {
        if (!currentUser()) {
            ev.preventDefault();
        }
    });

    return (
        <Flex align="center" justify="start" gap="xl" padding="s" classList={{ WelcomePage: true }}>
            <Display level={1}>Welcome</Display>
            <Spinner speed="slow" size="l" when={!ready()} />
            <FadeIn when={!!users().length}>
                <Flex align="center" justify="center">
                    <UsersButtonList users={users()} onClick={handleUserClick} />
                </Flex>
            </FadeIn>
        </Flex>
    );
};
