type TokenMetadata = {
    name: string;
    group: string;
};

export const TOKEN_GROUPS: string[] = ['Space', 'Color', 'Type'];

export const Tokens: TokenMetadata[] = [
    {
        name: 'Space',
        group: 'Space',
    },
    {
        name: 'Color',
        group: 'Color',
    },
    {
        name: 'Type',
        group: 'Type',
    },
];
