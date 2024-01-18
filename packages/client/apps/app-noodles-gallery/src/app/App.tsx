import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Router } from '@solidjs/router';
import { Component, JSX, Show } from 'solid-js';

import { MainNav } from '@/navigation/MainNav/MainNav';
import { Routes } from '@/navigation/Routes';
import {
    CurrentUserProvider,
    createCurrentUserContext,
    useCurrentUserContext,
} from '@/providers/CurrentUser';
import { ErrorBoundaryScreen } from '@/screens/ErrorBoundaryScreen/ErrorBoundaryScreen';
import { AppService } from '@/services/App';

import './App.css';

type RootProps = {
    children?: JSX.Element;
};

const Main: Component<RootProps> = props => {
    const { currentUser } = useCurrentUserContext();
    const { ready } = inject(AppService);

    return (
        <Flex direction="row">
            <Show when={!!currentUser() && ready()}>
                <MainNav />
            </Show>
            <div class="App-Main">{props.children}</div>
        </Flex>
    );
};

const Root: Component<RootProps> = props => {
    const context = createCurrentUserContext();
    return (
        <ErrorBoundaryScreen>
            <CurrentUserProvider {...context}>
                <Main>{props.children}</Main>
            </CurrentUserProvider>
        </ErrorBoundaryScreen>
    );
};

export const App: Component = () => {
    return (
        <Router root={Root}>
            <Routes />
        </Router>
    );
};
