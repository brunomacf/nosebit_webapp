let lodash = require('lodash'),
    config = require('common-config');

module.exports = {
    appConfig: JSON.parse(JSON.stringify(config)),

    dest: './docs',

    src: {
        html: './src/index.pug',
        404: './src/404.html',
        CNAME: './src/CNAME',
        sitemap: './src/sitemap.xml',
        images: [
            'src/assets/images/logo_icon.png',
            'src/assets/images/favicon.png'
        ],
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
