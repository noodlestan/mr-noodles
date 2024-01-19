import { Display, Icon } from '@noodlestan/ui-atoms';
import { ErrorBoundary as Boundary } from '@noodlestan/ui-error-boundary';
import { Flex } from '@noodlestan/ui-layouts';
import { BugIcon, CloudRain, ServerCrashIcon, SkullIcon, XOctagon } from 'lucide-solid';
import { Component, JSX, createSignal, onCleanup } from 'solid-js';

import './ErrorBoundaryScreen.css';

type ErrorBoundaryScreenProps = {
    children?: JSX.Element;
};

const logError = (error: Error) => {
    console.error(error);
};

const ICONS = [ServerCrashIcon, BugIcon, SkullIcon, CloudRain, XOctagon];
const SPEED = 15;

export const ErrorScreen: Component = () => {
    let timeout: number = 0;
    let speed = SPEED;

    const [colors, setColors] = createSignal<number[]>([0, 0, 0]);
    const [icons, setIcons] = createSignal<number[]>([0, 0, 0]);

    const random = (length: number) => Math.floor(Math.random() * length);
    const blip = () => {
        speed += random(SPEED / 4);
        setColors([random(14), random(14), random(14)]);
        setIcons([random(ICONS.length), random(ICONS.length), random(ICONS.length)]);
        timeout = setTimeout(blip, speed);
    };
    blip();

    onCleanup(() => clearTimeout(timeout));

    const icon = (index: number) => ICONS[icons()[index]];
    const color = (index: number) => `var(--color-sw-${colors()[index]}-hue)`;

    return (
        <div class="ErrorScreen">
            <Flex padding="xl" gap="l" align="center">
                <Flex direction="row" gap="s" justify="around">
                    <div style={{ '--error-icon-hue': color(0) }}>
                        <Icon icon={icon(0)} classList={{ 'ErrorScreen--icon': true }} />
                    </div>
                    <div style={{ '--error-icon-hue': color(1) }}>
                        <Icon icon={icon(1)} classList={{ 'ErrorScreen--icon': true }} />
                    </div>
                    <div style={{ '--error-icon-hue': color(2) }}>
                        <Icon icon={icon(2)} classList={{ 'ErrorScreen--icon': true }} />
                    </div>
                </Flex>
                <Display size="xl">Ouch</Display>
            </Flex>
        </div>
    );
};

export const ErrorBoundaryScreen: Component<ErrorBoundaryScreenProps> = props => {
    return (
        <Boundary fallback={ErrorScreen} onError={logError}>
            {props.children}
        </Boundary>
    );
};
