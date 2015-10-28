/**
 * Created by lmele on 27.10.2015.
 */
require.config({
    deps: [
        'main'
    ],
    paths : {
        backbone: 'bower_components/backbone/backbone',
        app: 'modules/app',
        foundation: 'bower_components/foundation/js/foundation',
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        adal: 'bower_components/adal-angular/lib/adal',
        marionette: 'bower_components/backbone.marionette/lib/backbone.marionette',
    },
    shim : {
        Backbone: {
            deps: ['underscore'],
            exports: 'backbone'
        },
        Foundation: {
            deps: ['jquery'],
            exports: 'foundation'
        },
        Marionette: {
            deps: ['backbone', 'underscore', 'jquery'],
            exports: 'marionette'
        },
        underscore: {
            exports: '_'
        },
        app: {
            deps: ['backbone', 'underscore', 'jquery'],
            exports: 'app'
        }
    },
    map : {
        // 'modules/content.course' : 'core/course'
    }
});
