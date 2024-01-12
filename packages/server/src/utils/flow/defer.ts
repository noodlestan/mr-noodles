export const defer = (fn: () => void, time: number = 1): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const result = await fn();
                resolve(result);
            } catch (err) {
                reject(err);
            }
        }, time);
    });
};
