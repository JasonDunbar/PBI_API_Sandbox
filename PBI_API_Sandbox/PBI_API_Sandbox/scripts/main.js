/*global require:true */
require(['app'], function(App) {

    'use strict';

    require(
        [
            'modules/router',
            // all modules
            'modules/login/index',
            'modules/dashboard/index'
        ], function() {
            App.start();
        });
});