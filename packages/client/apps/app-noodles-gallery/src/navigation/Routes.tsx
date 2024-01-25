import { Route } from '@solidjs/router';
import { Component } from 'solid-js';

import { RequireNotUser } from './RequireNotUser';
import { RequireUser } from './RequireUser';

import { FoldersScreen } from '@/screens/FoldersScreen/FoldersScreen';
import { HomeScreen } from '@/screens/HomeScreen/HomeScreen';
import { SettingsPage } from '@/screens/HomeScreen/pages/SettingsPage/SettingsPage';
import { WelcomePage } from '@/screens/HomeScreen/pages/WelcomePage/WelcomePage';
import { TimelineScreen } from '@/screens/TimelineScreen/TimelineScreen';
import { UserScreen } from '@/screens/UserScreen/UserScreen';
import { UserFavoritesPage } from '@/screens/UserScreen/pages/UserFavoritesPage/UserFavoritesPage';
import { UserHomePage } from '@/screens/UserScreen/pages/UserHomePage/UserHomePage';
import { UserSettingsPage } from '@/screens/UserScreen/pages/UserSettingsPage/UserSettingsPage';

export const Routes: Component = () => {
    // const Routes = useRoutes(routes);
    return (
        <>
            <Route path="/" component={RequireNotUser}>
                <Route path="/" component={HomeScreen}>
                    <Route path="/" component={WelcomePage} />
                    <Route path="/settings" component={SettingsPage} />
                </Route>
            </Route>
            <Route path="/" component={RequireUser}>
                <Route path="/user" component={UserScreen}>
                    <Route path="/home" component={UserHomePage} />
                    <Route path="/favorites" component={UserFavoritesPage} />
                    <Route path="/settings" component={UserSettingsPage} />
                </Route>
                <Route path="/timeline">
                    <Route path="/" component={TimelineScreen} />
                </Route>
                <Route path="/folders">
                    <Route path="/:root?/*parent" component={FoldersScreen} />
                </Route>
            </Route>
        </>
    );
};
