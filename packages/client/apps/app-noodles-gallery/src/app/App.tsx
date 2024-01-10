import { Flex } from '@noodlestan/ui-layouts';
import { Route, Router } from '@solidjs/router';
import { Component } from 'solid-js';

import { MainNav } from '@/navigation/MainNav/MainNav';
import { AlbumsScreen } from '@/screens/AlbumsScreen/AlbumsScreen';
import { ErrorBoundaryScreen } from '@/screens/ErrorBoundaryScreen/ErrorBoundaryScreen';
import { GalleryScreen } from '@/screens/GalleryScreen/GalleryScreen';
import { HomeScreen } from '@/screens/HomeScreen/HomeScreen';

import './App.css';

export const App: Component = () => {
    return (
        <ErrorBoundaryScreen>
            <Flex direction="row">
                <MainNav />
                <div class="App-Main">
                    <Router>
                        <Route path="/" component={HomeScreen} />
                        <Route path="/gallery" component={GalleryScreen} />
                        <Route path="/albums/*parent" component={AlbumsScreen} />
                    </Router>
                </div>
            </Flex>
        </ErrorBoundaryScreen>
    );
};
