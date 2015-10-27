/**
 * Created by lmele on 26.10.2015.
 */

define(['backbone', 'marionette', 'underscore','app'], function (Backbone, Marionette, _, App) {

    "use strict";

    var Login = App.module('Login');

    Login.Controller = Marionette.Controller.extend({
        initialize: function() {
            this.apiReq = 'https://login.windows.net/common/oauth2/authorize' +
                '?response_type=code'+
                '&client_id=d5757c3d-32b5-419c-b770-3d81560005a8'+
                '&resource=https://analysis.windows.net/powerbi/api'+
                '&redirect_uri= '+ window.location.href;
        },
        index: function() {
            if (_.isUndefined(this.loginWindow) && !~window.location.href.indexOf('&session_state')) {
                this.setupView();
                this.openWindow();
                this.timedCheck();
            }
            App.major.show(new this.loginView());
        },
        setupView: function() {
            var userDetails = Backbone.Model.extend({
                defaults: {
                    auth: null
                }
            });
            this.userDetails = new userDetails();
            this.loginView = Marionette.ItemView.extend({
                model: this.userDetails,
                template: "login/index.html",
                modelEvents: {
                    "change": "modelChanged"
                },
                modelChanged: function() {
                    this.render();
                }
            });
        },
        timedCheck: function() {
            var self = this;
            var pollTimer =  window.setInterval(function() {
                try{
                    if (~self.loginWindow.location.href.indexOf('&session_state')) {

                        self.loginWindow.close();
                        window.clearInterval(pollTimer);
                        console.log(self.getParameterByName(self.loginWindow.location.href, 'code'));
                        self.userDetails.set('auth', self.getParameterByName(self.loginWindow.location.href, 'code'));
                    }
                } catch (e) {

                }
            }, 100);
        },
        getParameterByName: function (urLocation, name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(urLocation)||[,""])[1].replace(/\+/g, '%20'))||null
        },
        openWindow: function () {
            this.loginWindow = window.open(
                this.apiReq,
                "_blank",
                "toolbar=yes," +
                " scrollbars=yes, " +
                "resizable=yes, " +
                "top=100," +
                " left=100," +
                " width=800," +
                " height=600");
        }
    });

    /*this.loginModule = Backbone.Model.extend({
        urlRoot:apiReq
    });


    var login = new this.loginModule();

    var win = window.open(apiReq, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=100, left=100, width=800, height=600");

    var pollTimer =  window.setInterval(function() {
        try{
            console.log(win.location.href, win);
            if (~win.location.href.indexOf('#redirect')) {

            }
        } catch (e) {

        }
    }, 100);*/

    return Login;
});
