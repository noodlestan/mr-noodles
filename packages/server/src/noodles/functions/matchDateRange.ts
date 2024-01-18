export const matchDateRange = (
    value: Date | undefined,
    from: Date | string | undefined,
    until: Date | string | undefined,
): boolean => {
    if (from !== undefined) {
        const dateFrom = typeof from === 'string' ? new Date(from) : from;
        if (value === undefined || value < dateFrom) {
            return false;
        }
    }
    if (until !== undefined) {
        const dateUntil = typeof until === 'string' ? new Date(until) : until;
        if (value === undefined || value > dateUntil) {
            return false;
        }
    }
    return true;
};
