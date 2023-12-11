export const defer = (fn: () => void): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const result = await fn();
                resolve(result);
            } catch (err) {
                reject(err);
            }
        }, 1);
    });
};
