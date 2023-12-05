const base = require('./config/_base.cjs');
const typescript = require('./config/typescript.cjs');
const react = require('./config/react.cjs');
const configs = require('./config/configs.cjs');
const scripts = require('./config/scripts.cjs');
const tests = require('./config/tests.cjs');

const config = {
    ...base,
    ignorePatterns: ['node_modules/', 'coverage/', 'dist/'],
    overrides: [...typescript, ...react, ...configs, ...scripts, ...tests],
};

module.exports = config;
