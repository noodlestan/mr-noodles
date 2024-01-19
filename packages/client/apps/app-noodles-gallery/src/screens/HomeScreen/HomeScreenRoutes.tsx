import { useLocation } from '@solidjs/router';
import { Component, Show } from 'solid-js';

import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';

export const HomeScreenRoutes: Component = () => {
    const location = useLocation();

    return (
        <>
            <Show when={location.pathname === '/'}>
                <WelcomePage />
            </Show>
            <Show when={location.pathname === '/settings'}>
                <SettingsPage />
            </Show>
        </>
    );
};
