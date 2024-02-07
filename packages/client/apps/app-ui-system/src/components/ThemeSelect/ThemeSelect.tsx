import { Select } from '@noodlestan/ui-forms';
import { themeStore } from '@noodlestan/ui-themes';
import { Component, For } from 'solid-js';

import { THEMES } from '@/data/themes';

import './ThemeSelect.css';

export const ThemeSelect: Component = () => {
    const { theme, setTheme } = themeStore;

    const handleThemeChange = (value: string) => setTheme(value);

    return (
        <Select size="s" onValueChange={handleThemeChange} length="auto" value={theme().name}>
            <For each={THEMES}>{theme => <option value={theme.name}>{theme.name}</option>}</For>
        </Select>
    );
};
