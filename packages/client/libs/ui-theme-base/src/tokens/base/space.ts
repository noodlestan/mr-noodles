import { TokenMap } from '@noodlestan/ui-tokens';

export const space: TokenMap = {
    /* gaps */

    '--space-gap-0': 'var(--scale-3xs)',
    '--space-gap-1': 'var(--scale-2xs)',
    '--space-gap-2': 'var(--scale-xs)',
    '--space-gap-3': 'var(--scale-s)',
    '--space-gap-4': 'var(--scale-m)',
    '--space-gap-5': 'var(--scale-l)',
    '--space-gap-6': 'var(--scale-xl)',

    /* padding */

    '--space-pad-0': 'var(--scale-3xs)',
    '--space-pad-1': 'var(--scale-2xs)',
    '--space-pad-2': 'var(--scale-xs)',
    '--space-pad-3': 'var(--scale-s)',

    /* size */

    /* 18px → 22px */
    '--size-xs': 'var(--scale-xs)',
    /* 24px → 29px */
    '--size-s': 'var(--scale-s)',
    /* 36px → 44px */
    '--size-m': 'var(--scale-m)',
    /* 48px → 58px */
    '--size-l': 'var(--scale-l)',
    /* 84px → 102px */
    '--size-xl': 'var(--scale-xl)',
    /* 132px → 160px */
    '--size-2xl': 'var(--scale-2xl)',
    /* 216px → 261px */
    '--size-3xl': 'var(--scale-3xl)',
    /* 348px → 421px */
    '--size-4xl': 'var(--scale-4xl)',
    /* 564px → 682px */
    '--size-5xl': 'var(--scale-5xl)',

    /* @link https://utopia.fyi/space/calculator?c=480,21,1.25,1800,24,1.333,7,2,&s=0.75|0.5|0.25,1.5|2|3|4.5|7.5|10.5|15,s-l&g=s,l,xl,12 */

    /* Space 3xs: 5px → 6px */
    '--scale-3xs': 'clamp(0.31rem, calc(0.29rem + 0.08vw), 0.38rem)',
    /* Space 2xs: 11px → 12px */
    '--scale-2xs': 'clamp(0.69rem, calc(0.66rem + 0.08vw), 0.75rem)',
    /* Space xs: 16px → 18px */
    '--scale-xs': 'clamp(1rem, calc(0.95rem + 0.15vw), 1.13rem)',
    /* Space s: 24px → 29px */
    '--scale-s': 'clamp(1.50rem, calc(1.36rem + 0.61vw), 1.81rem)',
    /* Space m: 36px → 44px */
    '--scale-m': 'clamp(2.25rem, calc(2.02rem + 0.97vw), 2.75rem)',
    /* Space l: 48px → 58px */
    '--scale-l': 'clamp(3.00rem, calc(2.72rem + 1.21vw), 3.63rem)',
    /* Space xl: 84px → 102px */
    '--scale-xl': 'clamp(5.25rem, calc(4.74rem + 2.18vw), 6.38rem)',
    /* Space 2xl: 132px → 160px */
    '--scale-2xl': 'clamp(8.25rem, calc(7.45rem + 3.39vw), 10.00rem)',
    /* Space 3xl: 216px → 261px */
    '--scale-3xl': 'clamp(13.50rem, calc(12.22rem + 5.45vw), 16.31rem)',
    /* Space 4xl: 348px → 421px */
    '--scale-4xl': 'clamp(21.75rem, calc(19.68rem + 8.85vw), 26.31rem)',
    /* Space 5xl: 564px → 682px */
    '--scale-5xl': 'clamp(35.25rem, calc(31.90rem + 14.30vw), 42.63rem)',
};
