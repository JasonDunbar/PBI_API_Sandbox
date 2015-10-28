define(['marionette', 'templates/templates', 'backbone','jquery', 'underscore'],
    function (Marionette, templates, Backbone) {

        'use strict';

        /** @this {App}*/
        var App = new Marionette.Application();

        App.addRegions({
            major: '#region-main-area'
        });

        App.on('before:start', function () {
            App.Routing = {};

            App.Routing.Router = Marionette.AppRouter.extend({
                appRoutes: {
                    '': 'login',
                    // Menu route DEFAULT ----------
                    '*default' : 'login'
                    // ------------------------------
                }
            });

            App.addInitializer(function(){
                App.Routing.AppRouter = new App.Routing.Router({
                    controller: new App.Router.Controller()
                });
                App.Nav = App.Routing;
            });
        });

        App.on('start', function () {
            // Backbone.history.start({pushState: true});
            Backbone.history.start();
        });

        Marionette.Renderer.render = function(template, data) {
            // allow No template
            if (template === undefined) {
                return '';
            }
            if (!window.JST[template]) {
                throw 'Template "' + template + '" not found!';
            }
            return _.template(JST[template](data));
        };


        return App;
    });
