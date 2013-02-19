requirejs.config({
    paths: {
        'jquery': 'vendor/jquery',
        'jqm-config': 'tap/JQMConfig',
        'jquerymobile': 'vendor/jqmobile/jquery.mobile',
        'json2': 'vendor/json2',
        'underscore': 'vendor/underscore',
        'backbone': 'vendor/backbone',
        'localStorage': 'vendor/backbone.localStorage',
        'backbone-super': 'vendor/backbone-super',
        'leaflet': 'vendor/leaflet/leaflet',
        'klass': 'vendor/klass',
        'photoswipe': 'vendor/photoswipe/code.photoswipe',
        'mediaelement': 'vendor/mediaelement/mediaelement-and-player'
    },
    shim: {
        'jquerymobile': {
            deps: ['jqm-config']
        },
        'backbone-super': {
            deps: ['backbone']
        },
        'leaflet': {
            exports: 'leaflet'
        },
        'photoswipe': {
            deps: ['jquery', 'klass'],
            exports: 'photoswipe'
        },
        'mediaelement': {
            exports: 'mediaelement'
        }
    }
});

require([
    'jquery',
    'tap/TapAPI',
    'tap/views/AppView',
    'tap/Router',
    'jquerymobile'
], function($, TapAPI, AppView, Router) {
    AppView.runApp();
});