export const matchEquals = (
    value: string | number | boolean | undefined,
    filter: string | number | boolean | undefined,
): boolean => {
    if (filter !== undefined) {
        if (value === undefined || filter !== value) {
            return false;
        }
    }
    return true;
};
