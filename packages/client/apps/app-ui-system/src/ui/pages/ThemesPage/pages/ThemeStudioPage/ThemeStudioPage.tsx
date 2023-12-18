import { Component } from 'solid-js';

import { DemoPage } from '@/ui/components/DemoPage';

import './ThemeStudioPage.css';

export const ThemeStudioPage: Component = () => {
    return <DemoPage classList={{ ThemeStudioPage: true }} title="Studio" />;
};
