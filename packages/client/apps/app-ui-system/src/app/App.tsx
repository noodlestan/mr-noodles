import { Flex } from '@noodlestan/ui-layouts';
import { Router } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

import { AppFooter } from './AppFooter';
import { AppNav } from './AppNav';

import { Routes } from '@/navigation/Routes';

import './App.css';

type MainProps = {
    children?: JSX.Element;
};

const Main: Component<MainProps> = props => {
    return (
        <Flex tag="main" classList={{ AppMain: true }}>
            <AppNav />
            <div class="AppMain--Container">{props.children}</div>
            <AppFooter />
        </Flex>
    );
};
export const App: Component = () => {
    return (
        <Router root={Main}>
            <Routes />
        </Router>
    );
};
