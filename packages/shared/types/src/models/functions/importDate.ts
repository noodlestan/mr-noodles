export const importDate = (value: string | Date | undefined): Date | undefined => {
    if (value) {
        return typeof value === 'string' ? new Date(value) : value;
    }
};
