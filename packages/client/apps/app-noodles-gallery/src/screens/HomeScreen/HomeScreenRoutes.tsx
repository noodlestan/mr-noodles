import { useLocation } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { UserFavoritesPage } from './pages/UserFavoritesPage/UserFavoritesPage';
import { UserHomePage } from './pages/UserHomePage/UserHomePage';
import { UserSettingsPage } from './pages/UserSettingsPage/UserSettingsPage';

export const HomeScreenRoutes: Component = () => {
    const location = useLocation();

    return (
        <>
            <Show when={location.pathname === '/'}>
                <UserHomePage />
            </Show>
            <Show when={location.pathname === '/favorites'}>
                <UserFavoritesPage />
            </Show>
            <Show when={location.pathname === '/settings'}>
                <UserSettingsPage />
            </Show>
        </>
    );
};
