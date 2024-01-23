// import { Text } from '@noodlestan/ui-atoms';
import { useLocation } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { useCurrentUserContext } from '@/providers/CurrentUser';
import { makeImageUrl } from '@/services/Images';

import './CurrentUserIcon.css';

export type CurrentUserIconProps = {
    foo?: 'bar';
};

export const CurrentUserIcon: Component<CurrentUserIconProps> = () => {
    const location = useLocation();
    const { currentUser } = useCurrentUserContext();

    const imageUrl = () => {
        const user = currentUser();
        return user ? makeImageUrl('user', user, 'thumb.small') : '';
    };

    const isActive = () => location.pathname === '/' || false;

    const classList = () => ({
        CurrentUserIcon: true,
        'CurrentUserIcon-is-active': isActive(),
    });

    const title = () => `${currentUser()?.name}'s home page`;

    return (
        <Show when={currentUser()}>
            <a href="/" classList={classList()} title={title()}>
                <span class="CurrentUserIcon--image">
                    <img src={imageUrl()} alt="" />
                </span>
            </a>
        </Show>
    );
};
