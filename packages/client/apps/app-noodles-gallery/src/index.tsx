import { RootProvider } from '@noodlestan/ui-root';
import { BaseTheme } from '@noodlestan/ui-theme-base';
import { render } from 'solid-js/web';

import { SystemUIProvider, createSystemUIContext } from './providers/SystemUI';

import { App } from '@/app/App';

const root = document.getElementById('root') as HTMLElement;

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
    );
}

const themes = () => [BaseTheme];
const systemUIContext = createSystemUIContext();
const { colourScheme } = systemUIContext;

render(() => {
    return (
        <SystemUIProvider {...systemUIContext}>
            <RootProvider
                themes={themes()}
                colourScheme={colourScheme()}
                theme="base"
                surface="stage"
            >
                <App />
            </RootProvider>
        </SystemUIProvider>
    );
}, root);
