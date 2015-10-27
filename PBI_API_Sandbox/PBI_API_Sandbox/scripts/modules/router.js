define(['app', 'marionette'], function (App, Marionette) {
    var Router = App.module('Router');

    "use strict";

    Router.Controller = Marionette.Controller.extend({
        initialize: function(/*options*/) {
            App.Controllers = {};
        },
        login: function(){
            App.Controllers.Login = new App.Login.Controller();
            App.Controllers.Login.index();
        }
    });

    return Router;
});