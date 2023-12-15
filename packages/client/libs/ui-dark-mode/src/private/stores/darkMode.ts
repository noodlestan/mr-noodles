import { Accessor, createSignal } from 'solid-js';

type ThemeStore = {
    darkMode: Accessor<boolean>;
    setDarkMode: (value: boolean) => void;
};

const [darkMode, setDarkMode] = createSignal<boolean>(false);

export const darModeStore: ThemeStore = {
    darkMode,
    setDarkMode,
};
