import { Icon } from '@noodlestan/ui-atoms';
import { ClockIcon, SettingsIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import './ExampleNano.css';

type ExampleSmallProps = { title?: string };

export const ExampleNano: Component<ExampleSmallProps> = () => (
    <>
        <Icon size="s" icon={ClockIcon} />
        <Icon size="s" icon={SettingsIcon} />
    </>
);
