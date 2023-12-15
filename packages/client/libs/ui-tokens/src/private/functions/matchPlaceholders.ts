export const matchTokenPlaceholders = (value: string): string[] | null =>
    value.match(/var\([a-z0-9-]+\)/g);
