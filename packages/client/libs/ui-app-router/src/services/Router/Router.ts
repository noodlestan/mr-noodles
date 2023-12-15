import { Accessor, createSignal } from 'solid-js';

import { Route } from './types';

interface RouterServiceInterface {
    route: Accessor<Route | undefined>;
    setRoute: (id: Route) => void;
}

export const createRouterService = (): RouterServiceInterface => {
    const [route, setRoute] = createSignal<Route>();

    return {
        route,
        setRoute,
    };
};
