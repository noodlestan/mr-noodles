import { Component } from 'solid-js';

import { ErrorBoundaryScreen } from '@/ui/screens/ErrorBoundaryScreen/ErrorBoundaryScreen';
import { GalleryScreen } from '@/ui/screens/GalleryScreen/GalleryScreen';

import './App.css';

export const App: Component = () => {
    return (
        <ErrorBoundaryScreen>
            <GalleryScreen />
        </ErrorBoundaryScreen>
    );
};
