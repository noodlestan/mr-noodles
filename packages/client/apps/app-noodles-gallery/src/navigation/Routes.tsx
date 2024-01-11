import { Route } from '@solidjs/router';
import { Component } from 'solid-js';

import { AlbumsScreen } from '@/screens/AlbumsScreen/AlbumsScreen';
import { GalleryScreen } from '@/screens/GalleryScreen/GalleryScreen';
import { HomeScreen } from '@/screens/HomeScreen/HomeScreen';

export const Routes: Component = () => {
    // const Routes = useRoutes(routes);
    return (
        <>
            <Route path="/" component={HomeScreen} />
            <Route path="/timeline" component={GalleryScreen} />
            <Route path="/folders/*parent" component={AlbumsScreen} />
        </>
    );
};
