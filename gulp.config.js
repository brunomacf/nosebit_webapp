let lodash = require('lodash'),
    config = require('common-config');

module.exports = {
    appConfig: JSON.parse(JSON.stringify(config)),

    dest: './docs',

    src: {
        html: './src/index.pug',
        404: './src/404.html',
        sitemap: './src/sitemap.xml',
        main_js: './src/main.jsx',
        js: ['./src/**/*.js', './src/**/*.jsx'],
        assets: ['./src/assets/icons/**/*'],
        i18n: ['./src/assets/i18n/**/*']
    },

    vendor: {
        css: [],
        assets: []
    }
};
