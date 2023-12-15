import { readFileSync } from 'fs';

import { makeViteConfig } from '../../config/vite-lib.config';

const NAME = JSON.parse(readFileSync('package.json', 'utf8')).name;

export default makeViteConfig(__dirname, NAME);
