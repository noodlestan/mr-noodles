export const decamelize = (input: string): string => {
    return (
        input
            // Separate capitalized words.
            .replace(/([A-Z]{2,})(\d+)/g, '$1 $2')
            .replace(/([a-z\d]+)([A-Z]{2,})/g, '$1 $2')
            .replace(/([a-z\d])([A-Z])/g, '$1 $2')
            // `[a-rt-z]` matches all lowercase characters except `s`.
            // This avoids matching plural acronyms like `APIs`.
            .replace(/([A-Z]+)([A-Z][a-rt-z\d]+)/g, '$1 $2')
    );
};
