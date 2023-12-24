import { Accessor, createSignal } from 'solid-js';

type DarkModeStore = {
    darkMode: Accessor<boolean>;
    setDarkMode: (value: boolean) => void;
};

const [darkMode, setDarkMode] = createSignal<boolean>(false);

export const darModeStore: DarkModeStore = {
    darkMode,
    setDarkMode,
};
