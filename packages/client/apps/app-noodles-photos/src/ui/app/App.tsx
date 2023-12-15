import { Button } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

// import { AppRoutes } from './AppRoutes';

import './App.css';

export const App: Component = () => {
    const handleClick = () => console.info('good night');

    return (
        <main>
            Hello world<Button onClick={handleClick}>Click me</Button>
        </main>
    );
};
