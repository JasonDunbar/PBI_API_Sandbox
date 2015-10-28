/**
 * Created by lmele on 26.10.2015.
 */

define(['backbone', 'marionette', 'underscore','app'], function (Backbone, Marionette, _, App) {

    "use strict";

    var Dashboard = App.module('Dashboard');

    Dashboard.controller = null;

    Dashboard.dashboardCollection = Backbone.Collection.extend({
        url: 'https://api.powerbi.com/beta/myorg/dashboards'
    });

    Dashboard.tileView = Marionette.ItemView.extend({
        tagName: 'option',
        template: 'dashboard/tile.html',
        attributes: function() {
            return {
                value: this.model.get('id')
            }
        }
    });

    Dashboard.tileModel = Backbone.Model.extend({

    });

    Dashboard.model = Backbone.Model.extend({
        defaults: {
            auth: ''
        }
    });

    Dashboard.dashboardView = Marionette.CompositeView.extend({
        template: 'dashboard/index.html',
        childViewContainer: '#dashboard-elements'
    });

    Dashboard.listenTo(App, 'api:login', function(auth) {
        Dashboard.controller = new Dashboard.Controller(auth);
    });

    Dashboard.Controller = Marionette.Controller.extend({
        initialize: function(auth) {
            this.dashboardCollection = new Dashboard.dashboardCollection({ });
            this.dashboardCollection.fetch({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer XXXX');
                },
                error: function(model, response) {
                    // forbidden
                    if (response.status === 403) {
                        App.Controllers.Login.login();
                    } else {
                        alert('error connecting to PBI');
                    }
                }
            });
            this.dashboardView = new Dashboard.dashboardView({
                collection: this.dashboardCollection,
                childView: Dashboard.tileView,
                model: new Dashboard.model({
                    auth: auth
                })
            });
            this.listenTo(this.dashboardCollection, 'sync', function() {
                var values = this.dashboardCollection.models[0].get('value');
                this.dashboardCollection.reset(values);
                console.log(this.dashboardCollection);
                App.major.show(this.dashboardView);
            })

        }
    });
    return Dashboard.controller;
});
