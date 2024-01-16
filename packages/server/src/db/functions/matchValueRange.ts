export const matchValueRange = (
    value: number | undefined,
    from: number | undefined,
    until: number | undefined,
): boolean => {
    if (from !== undefined) {
        if (value === undefined || value < from) {
            return false;
        }
    }
    if (until !== undefined) {
        if (value === undefined || value > until) {
            return false;
        }
    }
    return true;
};
