import type { Route } from '@noodlestan/ui-app-router';

export const ROUTE_HOME: Route = '/';
export const ROUTE_COMPONENTS: Route = '/components';
export const ROUTE_THEMES: Route = '/themes';
export const ROUTE_TOKENS: Route = '/tokens';

export const ROUTES = [
    { name: 'Components', route: ROUTE_COMPONENTS },
    { name: 'Themes', route: ROUTE_THEMES },
    { name: 'Tokens', route: ROUTE_TOKENS },
];
