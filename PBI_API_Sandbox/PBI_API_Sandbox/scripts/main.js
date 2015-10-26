require.config({
    deps: [
        'modules/all'
    ],
    paths : {
        Backbone: 'bower_components/backbone/backbone',
        Underscore: 'bower_components/underscore/underscore',
    },
    shim : {
        Backbone: {
            deps : ['Underscore'],
            exports : 'Backbone'
        }
    },
    map : {
        // 'modules/content.course' : 'core/course'
    }
});
