import { Component } from 'solid-js';

import { DemoPage } from '@/components/DemoPage';

import './ThemeBasePage.css';

export const ThemeBasePage: Component = () => {
    return <DemoPage classList={{ ThemeBasePage: true }} title="Base" />;
};
