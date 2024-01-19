import { Route, useNavigate } from '@solidjs/router';
import { Component, createEffect } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { useCurrentUserContext } from '@/providers/CurrentUser';
import { FoldersScreen } from '@/screens/FoldersScreen/FoldersScreen';
import { HomeScreen } from '@/screens/HomeScreen/HomeScreen';
import { TimelineScreen } from '@/screens/TimelineScreen/TimelineScreen';
import { UserScreen } from '@/screens/UserScreen/UserScreen';

const requireNotUser = (component: Component): Component => {
    return function (props) {
        const { currentUserId } = useCurrentUserContext();
        const navigate = useNavigate();

        createEffect(() => {
            if (currentUserId()) {
                navigate('/user');
            }
        });
        return <Dynamic component={component} {...props} />;
    };
};

const requireUser = (component: Component): Component => {
    return function (props) {
        const { currentUserId } = useCurrentUserContext();
        const navigate = useNavigate();

        createEffect(() => {
            if (!currentUserId()) {
                navigate('/');
            }
        });
        return <Dynamic component={component} {...props} />;
    };
};

export const Routes: Component = () => {
    // const Routes = useRoutes(routes);
    return (
        <>
            <Route path="/" component={requireNotUser(HomeScreen)} />
            <Route path="/settings" component={HomeScreen} />
            <Route path="/user/" component={requireUser(UserScreen)} />
            <Route path="/user/favorites" component={requireUser(UserScreen)} />
            <Route path="/user/settings" component={requireUser(UserScreen)} />
            <Route path="/timeline" component={requireUser(TimelineScreen)} />
            <Route path="/folders/*parent" component={requireUser(FoldersScreen)} />
        </>
    );
};
