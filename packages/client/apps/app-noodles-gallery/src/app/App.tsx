import { Flex } from '@noodlestan/ui-layouts';
import { Router } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

import { MainNav } from '@/navigation/MainNav/MainNav';
import { Routes } from '@/navigation/Routes';
import { ErrorBoundaryScreen } from '@/screens/ErrorBoundaryScreen/ErrorBoundaryScreen';

import './App.css';

type RootProps = {
    children?: JSX.Element;
};

const Root: Component<RootProps> = props => {
    // createEffect(() => console.log(props.children));

    return (
        <ErrorBoundaryScreen>
            <Flex direction="row">
                <MainNav />
                <div class="App-Main">{props.children}</div>
            </Flex>
        </ErrorBoundaryScreen>
    );
};

export const App: Component = () => {
    // const Routes = useRoutes(routes);

    return (
        <Router root={Root}>
            <Routes />
        </Router>
    );
};
