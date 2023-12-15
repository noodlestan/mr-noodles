import { Component } from 'solid-js';

import { DemoPage } from '@/ui/components/DemoPage';

import './ThemeStickingPage.css';

export const ThemeStickingPage: Component = () => {
    return <DemoPage classList={{ ThemeStickingPage: true }} title="Studio" />;
};
