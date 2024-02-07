import { Flex } from '@noodlestan/ui-layouts';
import { Component, JSX } from 'solid-js';

import './PageLayout.css';

// todo slots https://raqueebuddinaziz.com/blog/3-patterns-to-write-better-and-more-readable-solidjs-components/#verbose-and-less-readable-version
// will using children() break context?

type PageLayoutProps = {
    classList?: { [key: string]: boolean };
    children: JSX.Element;
};

export const PageLayout: Component<PageLayoutProps> = props => {
    const classList = () => ({
        ...props.classList,
        PageLayout: true,
    });

    return (
        // <Surface variant="page">
        <Flex classList={classList()} full>
            {/* <div class="PageLayout--Nav"> */}
            {/* </div> */}
            {/* <div class="PageLayout--Content"> */}
            {props.children}
            {/* </div> */}
        </Flex>
        // </Surface>
    );
};
