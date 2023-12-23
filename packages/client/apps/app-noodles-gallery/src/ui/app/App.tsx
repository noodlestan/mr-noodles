import { Component } from 'solid-js';

import { ErrorBoundaryScreen } from '../screens/ErrorBoundaryScreen/ErrorBoundaryScreen';
import { GalleryScreen } from '../screens/GalleryScreen/GalleryScreen';

import './App.css';

export const App: Component = () => {
    return (
        <ErrorBoundaryScreen>
            <GalleryScreen />
        </ErrorBoundaryScreen>
    );
};
