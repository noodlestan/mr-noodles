import { Route } from '@solidjs/router';
import { Component } from 'solid-js';

import { FoldersScreen } from '@/screens/FoldersScreen/FoldersScreen';
import { GalleryScreen } from '@/screens/GalleryScreen/GalleryScreen';
import { HomeScreen } from '@/screens/HomeScreen/HomeScreen';

export const Routes: Component = () => {
    // const Routes = useRoutes(routes);
    return (
        <>
            <Route path="/" component={HomeScreen} />
            <Route path="/favorites" component={HomeScreen} />
            <Route path="/settings" component={HomeScreen} />
            <Route path="/timeline" component={GalleryScreen} />
            <Route path="/folders/*parent" component={FoldersScreen} />
        </>
    );
};
