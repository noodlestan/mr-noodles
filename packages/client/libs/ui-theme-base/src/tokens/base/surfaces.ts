export const surfaces = {
    stage: {
        '--surface-bg-hue-sat': 'var(--color-bg-hue), var(--color-bg-sat)',
        '--surface-bg-light-alpha': 'var(--color-bg-light-4), 1',

        '--surface-border-hue-sat': 'var(--color-fg-hue), var(--color-fg-sat)',
        '--surface-border-light': 'var(--color-light-8)',
        '--surface-border-style': 'solid',
        '--surface-border-width': '0',
        '--surface-border-radius': '0',

        '--color-primary-hue-sat': 'var(--color-fg-hue), var(--color-fg-sat)',
        '--color-primary-light': 'var(--color-fg-light-4)',

        '--color-passive-hue-sat': 'var(--color-sw-0-hue), var(--color-sw-0-sat)' /* gray */,
        '--color-neutral-hue-sat': 'var(--color-sw-7-hue), var(--color-sw-7-sat)' /* indigo */,
        '--color-good-hue-sat': 'var(--color-sw-10-hue), var(--color-sw-10-sat)' /* teal */,
        '--color-meh-hue-sat': 'var(--color-sw-14-hue), var(--color-sw-14-sat)' /* orange */,
        '--color-bad-hue-sat': 'var(--color-sw-15-hue), var(--color-sw-15-sat)' /* orangered */,

        '--color-i-rest-hue-sat': 'var(--color-sw-9-hue), var(--color-sw-9-sat)' /* cyan */,
        '--color-i-rest-light': 'var(--color-light-3)',
        '--color-i-hover-hue-sat': 'var(--color-sw-9-hue), var(--color-sw-9-sat)' /* cyan */,
        '--color-i-hover-light': 'var(--color-light-1)',

        '--color-on-hue-sat': 'var(--color-sw-12-hue), var(--color-sw-12-sat)' /* lime */,

        '--color-i-active-hue-sat': 'var(--color-primary-hue-sat)',
        '--color-i-active-light': 'var(--color-primary-light)',

        '--color-i-disabled-hue-sat': 'var(--color-sw-1-hue), var(--color-sw-1-sat)',
        '--color-i-disabled-light': 'var(--color-light-3)',
    },

    page: {
        '--surface-bg-light-alpha': 'var(--color-bg-light-2), 1',
    },

    card: {
        '--surface-bg-light-alpha': 'var(--color-bg-light-0), 1',
        '--surface-hover-light-alpha': 'var(--color-bg-light-2), 1',
        'border-radius': 'var(--radius-m)',
    },

    banner: {
        '--surface-bg-hue-sat': 'var(--color-passive-hue-sat)',
        '--surface-bg-light-alpha': 'var(--color-bg-light-4), 1',
    },

    inverse: {
        '--surface-bg-light-alpha': 'var(--color-bg-light-0), 1',
    },
};
