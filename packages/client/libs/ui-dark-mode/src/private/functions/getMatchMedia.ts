export const getMatchMedia = (query: string): MediaQueryList | undefined =>
    !!window.matchMedia && window.matchMedia(query);
