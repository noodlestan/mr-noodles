import { makeViteConfig } from '../../config/vite-app.config';

export default makeViteConfig(__dirname, {
    optimizeDeps: {
        include: ['@noodlestan/shared-types'],
    },
    build: {
        commonjsOptions: {
            include: [/shared\//, /node_modules\//],
        },
    },
});
