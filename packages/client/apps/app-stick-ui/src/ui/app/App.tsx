import { Flex } from '@noodlestan/ui-layouts';
import { Component } from 'solid-js';

import { AppFooter } from './AppFooter';
import { AppNav } from './AppNav';

import { AppRoutes } from '@/ui/routes/AppRoutes';

import './App.css';

export const App: Component = () => {
    return (
        <Flex tag="main" classList={{ StickUiApp: true }}>
            <AppNav />
            <AppRoutes />
            <AppFooter />
        </Flex>
    );
};
