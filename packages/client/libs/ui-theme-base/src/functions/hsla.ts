export const hsla = (h: string, s: string, l: string, a?: string): string => {
    if (a === undefined) {
        return `hsl(${h},${s},${l})`;
    } else {
        return `hsl(${h},${s},${l},${a})`;
    }
};
