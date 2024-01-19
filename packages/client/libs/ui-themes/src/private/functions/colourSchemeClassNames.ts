import { useColourSchemeContext } from '../../providers/ColourSchemeProvider';

export const colourSchemeClassNames = (): string[] => {
    const { colourScheme } = useColourSchemeContext();
    return colourScheme() === 'dark' ? ['ColourScheme-dark'] : ['ColourScheme-light'];
};
