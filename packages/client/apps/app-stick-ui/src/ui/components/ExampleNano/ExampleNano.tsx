import { Icon } from '@noodlestan/ui-atoms';
import ClockSvg from '@noodlestan/ui-icons/src/assets/icons/clock.svg';
import SettingsSvg from '@noodlestan/ui-icons/src/assets/icons/settings.svg';
import { Component } from 'solid-js';

import './ExampleNano.css';

type ExampleSmallProps = { title?: string };

export const ExampleNano: Component<ExampleSmallProps> = () => (
    <>
        <Icon size="s" svg={ClockSvg} />
        <Icon size="s" svg={SettingsSvg} />
    </>
);
