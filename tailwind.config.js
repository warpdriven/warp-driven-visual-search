/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.php',
        './assets/src/js/components/**/*.vue'
    ],
    theme: {
        extend: {},
    },
    corePlugins: {
        preflight: false,
    },
    experimental: {
        optimizeUniversalDefaults: true,
    },
    plugins: [],
}
