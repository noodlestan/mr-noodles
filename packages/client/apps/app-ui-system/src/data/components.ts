export type ComponentMetadata = {
    name: string;
    package: string;
};

export const COMPONENTS: ComponentMetadata[] = [
    {
        name: 'Banner',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'Button',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'DataItem',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'DataValue',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'Display',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'Flex',
        package: '@noodlestan/ui-layouts',
    },
    {
        name: 'Icon',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'IconButton',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'Link',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'Label',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'NavLink',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'Select',
        package: '@noodlestan/ui-forms',
    },
    {
        name: 'Surface',
        package: '@noodlestan/ui-layouts',
    },
    {
        name: 'Text',
        package: '@noodlestan/ui-atoms',
    },
    {
        name: 'TextInput',
        package: '@noodlestan/ui-forms',
    },
];

export const findComponent = (name: string): ComponentMetadata => {
    const found = COMPONENTS.find(c => c.name === name);
    if (!found) {
        throw new Error(`Unknown component "${name}".`);
    }
    return found;
};
