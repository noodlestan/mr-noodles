import { Flex } from '@noodlestan/ui-layouts';
import { Route, Router } from '@solidjs/router';
import { Component } from 'solid-js';

import { MainNav } from '@/ui/navigation/MainNav/MainNav';
import { AlbumsScreen } from '@/ui/screens/AlbumsScreen/AlbumsScreen';
import { ErrorBoundaryScreen } from '@/ui/screens/ErrorBoundaryScreen/ErrorBoundaryScreen';
import { GalleryScreen } from '@/ui/screens/GalleryScreen/GalleryScreen';

import './App.css';

export const App: Component = () => {
    return (
        <ErrorBoundaryScreen>
            <Flex direction="row">
                <MainNav />
                <div class="App-Main">
                    <Router>
                        <Route path="/" component={() => <></>} />
                        <Route path="/gallery" component={GalleryScreen} />
                        <Route path="/albums/*parent" component={AlbumsScreen} />
                    </Router>
                </div>
            </Flex>
        </ErrorBoundaryScreen>
    );
};
