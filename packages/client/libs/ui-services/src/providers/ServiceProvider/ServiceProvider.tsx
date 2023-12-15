import { Component, JSX } from 'solid-js';
import { ServiceRegistry } from 'solid-services';

type ServiceProviderProps = {
    children?: JSX.Element;
};

export const ServiceProvider: Component<ServiceProviderProps> = props => {
    return <ServiceRegistry>{props.children}</ServiceRegistry>;
};
