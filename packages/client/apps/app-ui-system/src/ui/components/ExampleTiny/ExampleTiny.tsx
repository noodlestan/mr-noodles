import { Display, Icon, IconButton } from '@noodlestan/ui-atoms';
import { ClockIcon, SettingsIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import './ExampleTiny.css';

type ExampleSmallProps = { title?: string };

export const ExampleTiny: Component<ExampleSmallProps> = props => (
    <>
        <Icon size="s" icon={ClockIcon} />
        <Display level={4}>{props.title || 'Foobar'}</Display>
        <IconButton size="s" variant="primary" icon={SettingsIcon} />
    </>
);
