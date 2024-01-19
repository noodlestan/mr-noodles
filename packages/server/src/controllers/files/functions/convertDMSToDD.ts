/* eslint-disable no-new */

export const convertDMSToDD = (
    direction: string | undefined,
    parts?: number[],
): number | undefined => {
    if (!direction || !parts) {
        return undefined;
    }

    const [degrees = 0, minutes = 0, seconds = 0] = parts || [];
    let dd = degrees + minutes / 60 + seconds / (60 * 60);

    if (direction === 'S' || direction === 'W') {
        dd = dd * -1;
    }
    return dd;
};
