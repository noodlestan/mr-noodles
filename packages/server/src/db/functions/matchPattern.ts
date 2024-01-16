export const matchPattern = (value: string | undefined, pattern: string | undefined): boolean => {
    if (pattern !== undefined && /[a-z0-9/.*{},]+/i.test(pattern)) {
        if (value === undefined) {
            return false;
        }
        // eslint-disable-next-line security/detect-non-literal-regexp
        const r = new RegExp(`${value}`, 'i');
        return r.test(value);
    }
    return true;
};
