import { Component, JSX } from 'solid-js';

import { TokensNav } from './components/TokensNav';

import { PageLayout } from '@/components/PageLayout';

import './TokensScreen.css';

type TokensScreenProps = {
    children?: JSX.Element;
};

export const TokensScreen: Component<TokensScreenProps> = props => {
    return (
        <PageLayout classList={{ TokensScreen: true }}>
            <div class="PageLayout--Nav">
                <TokensNav />
            </div>
            <div class="PageLayout--Content">{props.children}</div>
        </PageLayout>
    );
};
