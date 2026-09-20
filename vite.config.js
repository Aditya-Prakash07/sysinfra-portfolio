import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname ?? __dirname, 'resources/js'),
        },
    },
    // HostGator shared hosting has no persistent Node process — we only ever
    // ship the compiled output of `npm run build` (public/build), never run
    // `npm run dev` or a Node server in production. See README-DEPLOYMENT.md.
});
