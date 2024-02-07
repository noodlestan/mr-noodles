import { Component, JSX } from 'solid-js';

import { ThemesNav } from './components/ThemesNav';

import { PageLayout } from '@/components/PageLayout';

import './ThemesScreen.css';

type ThemesScreenProps = {
    children?: JSX.Element;
};

export const ThemesScreen: Component<ThemesScreenProps> = props => {
    return (
        <PageLayout classList={{ ThemesScreen: true }}>
            <div class="PageLayout--Nav">
                <ThemesNav />
            </div>
            <div class="PageLayout--Content">{props.children}</div>
        </PageLayout>
    );
};
