import { Component, JSX } from 'solid-js';

import { ComponentsNav } from './components/ComponentsNav';

import { PageLayout } from '@/components/PageLayout';

import './ComponentsScreen.css';

type ComponentsScreenProps = {
    children?: JSX.Element;
};

export const ComponentsScreen: Component<ComponentsScreenProps> = props => {
    return (
        <PageLayout classList={{ ComponentsScreen: true }}>
            <div class="PageLayout--Nav">
                <ComponentsNav />
            </div>
            <div class="PageLayout--Content">{props.children}</div>
        </PageLayout>
    );
};
