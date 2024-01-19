// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { MoonIcon, SettingsIcon, SunIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import { MainNavButton } from '@/navigation/MainNavButton/MainNavButton';
import { useSystemUIContext } from '@/providers/SystemUI';

import './HomeBar.css';

export type HomeBarProps = {
    foo?: 'bar';
};

export const HomeBar: Component<HomeBarProps> = () => {
    const { colourScheme, setColourScheme } = useSystemUIContext();

    const SchemeIcon = () => {
        return colourScheme() === 'dark' ? MoonIcon : SunIcon;
    };

    const schemeLabel = () => {
        return colourScheme() === 'dark' ? 'Dark scheme' : 'Light scheme';
    };

    const handleSchemeClick = () => {
        setColourScheme(current => (current === 'light' ? 'dark' : 'light'));
    };

    return (
        // <Surface variant="page" >
        <Flex padding="m" classList={{ HomeBar: true }}>
            <Flex direction="row" gap="l" justify="between" align="center">
                <Flex direction="row" gap="m" />
                <Flex direction="row" gap="none">
                    <MainNavButton icon={SettingsIcon} href="/settings" label="Settings" />
                    <MainNavButton
                        icon={SchemeIcon()}
                        label={schemeLabel()}
                        onClick={handleSchemeClick}
                    />
                </Flex>
            </Flex>
        </Flex>
        // </Surface>
    );
};
