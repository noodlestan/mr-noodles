import { ServiceProvider } from '@noodlestan/ui-services';
import { BaseTheme } from '@noodlestan/ui-theme-base';
import { RootProvider } from '@noodlestan/ui-themes';
import { render } from 'solid-js/web';

import { App } from '@/ui/app/App';

const root = document.getElementById('root') as HTMLElement;

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
    );
}

const themes = () => [BaseTheme];

render(
    () => (
        <ServiceProvider>
            <RootProvider themes={themes()} theme="base" surface="stage">
                <App />
            </RootProvider>
        </ServiceProvider>
    ),
    root,
);
