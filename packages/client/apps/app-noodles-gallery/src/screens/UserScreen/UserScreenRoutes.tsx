import { useLocation } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { UserFavoritesPage } from './pages/UserFavoritesPage/UserFavoritesPage';
import { UserHomePage } from './pages/UserHomePage/UserHomePage';
import { UserSettingsPage } from './pages/UserSettingsPage/UserSettingsPage';

export const UserScreenRoutes: Component = () => {
    const location = useLocation();

    return (
        <>
            <Show when={location.pathname === '/user'}>
                <UserHomePage />
            </Show>
            <Show when={location.pathname === '/user/favorites'}>
                <UserFavoritesPage />
            </Show>
            <Show when={location.pathname === '/user/settings'}>
                <UserSettingsPage />
            </Show>
        </>
    );
};
