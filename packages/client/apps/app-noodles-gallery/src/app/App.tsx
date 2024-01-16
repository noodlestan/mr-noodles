import { Flex } from '@noodlestan/ui-layouts';
import { Router, useNavigate } from '@solidjs/router';
import { Component, JSX, createEffect } from 'solid-js';

import { MainNav } from '@/navigation/MainNav/MainNav';
import { Routes } from '@/navigation/Routes';
import {
    CurrentUserProvider,
    createCurrentUserContext,
    useCurrentUserContext,
} from '@/providers/CurrentUser';
import { ErrorBoundaryScreen } from '@/screens/ErrorBoundaryScreen/ErrorBoundaryScreen';

import './App.css';

type RootProps = {
    children?: JSX.Element;
};

const Main: Component<RootProps> = props => {
    const { currentUser } = useCurrentUserContext();
    const navigate = useNavigate();

    createEffect(() => {
        if (!currentUser()) {
            navigate('/');
        }
    });

    return (
        <Flex direction="row">
            <MainNav />
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
