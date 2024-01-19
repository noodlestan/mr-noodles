import { Accessor, onCleanup } from 'solid-js';

import { getMatchMedia } from '../../private/functions/getMatchMedia';
import { darModeStore } from '../../private/stores/darkMode';

interface DarkModeServiceInterface {
    darkMode: Accessor<boolean>;
    setDarkMode: (value: boolean) => void;
}

// CAUTION: Abandoned land see colourScheme in

export const createDarkModeService = (): DarkModeServiceInterface => {
    const { darkMode, setDarkMode } = darModeStore;

    const initialValue = !!getMatchMedia('(prefers-color-scheme: dark)')?.matches;

    const handleMatchChange = (event: MediaQueryListEvent) => {
        if (event.matches) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    };

    const match = getMatchMedia('(prefers-color-scheme: dark)');
    match?.addEventListener('change', handleMatchChange);

    setDarkMode(initialValue);

    onCleanup(() => {
        match?.removeEventListener('change', handleMatchChange);
    });

    return {
        darkMode,
        setDarkMode,
    };
};
