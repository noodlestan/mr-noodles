import { Display, Icon, IconButton } from '@noodlestan/ui-atoms';
import ClockSvg from '@noodlestan/ui-icons/src/assets/icons/clock.svg';
import SettingsSvg from '@noodlestan/ui-icons/src/assets/icons/settings.svg';
import { Component } from 'solid-js';

import './ExampleTiny.css';

type ExampleSmallProps = { title?: string };

export const ExampleTiny: Component<ExampleSmallProps> = props => (
    <>
        <Icon size="s" svg={ClockSvg} />
        <Display level={4}>{props.title || 'Foobar'}</Display>
        <IconButton size="s" variant="primary" svg={SettingsSvg} />
    </>
);
