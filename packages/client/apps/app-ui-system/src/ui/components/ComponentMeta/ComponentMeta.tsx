import { Component } from 'solid-js';

import { ImportStatement } from '../ImportStatement';

import { ComponentMetadata } from '@/data/components';

import './ComponentMeta.css';

type ComponentMetaProps = {
    component: ComponentMetadata;
};

export const ComponentMeta: Component<ComponentMetaProps> = props => {
    return (
        <div
            classList={{
                ComponentMeta: true,
            }}
        >
            <ImportStatement name={props.component.name} package={props.component.package} />
        </div>
    );
};
