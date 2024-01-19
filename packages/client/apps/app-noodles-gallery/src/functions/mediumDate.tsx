export const mediumDate = (date?: Date): string => {
    if (!date) {
        return 'x';
    }
    try {
        return new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'medium',
            timeZone: 'Europe/Madrid',
        }).format(date);
    } catch (err) {
        return '';
    }
};
