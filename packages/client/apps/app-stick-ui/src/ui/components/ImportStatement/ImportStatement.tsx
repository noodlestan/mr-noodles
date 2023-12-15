import { Component } from 'solid-js';

import './ImportStatement.css';

type ImportStatementProps = {
    name: string;
    package: string;
};

export const ImportStatement: Component<ImportStatementProps> = props => {
    const statement = () => `import { ${props.name} } from '${props.package}';`;

    return (
        <div
            classList={{
                ImportStatement: true,
            }}
        >
            <code>{statement()}</code>
        </div>
    );
};
