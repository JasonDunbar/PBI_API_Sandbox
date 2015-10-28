/**
 * Created by lmele on 26.10.2015.
 */

define([
    'backbone',
    'marionette',
    'underscore',
    'app',
    'modules/storage/index',
    'adal'
], function (Backbone, Marionette, _, App, Storage, Adal) {

    "use strict";

    var Login = App.module('Login');

    var CPRS_PROXY = 'http://localhost:3000/?auth=';

    Login.token = Backbone.Model.extend({
        initialize: function() {

        },
        urlRoot: CPRS_PROXY + 'https://login.windows.net/common/oauth2/authorize',
        defaults: {
            auth: null
        }
    });

    Login.Controller = Marionette.Controller.extend({
        initialize: function() {
            this.apiReqCode = 'https://login.windows.net/common/oauth2/authorize' +
                '?response_type=code'+
                '&client_id=d5757c3d-32b5-419c-b770-3d81560005a8'+
                '&resource=https://analysis.windows.net/powerbi/api'+
                '&redirect_uri= '+ window.location.href;
        },
        index: function() {
            if (Storage.getObject('code')) {
                App.trigger('api:login', Storage.getObject('code'));
                return;
            }
            this.login();
        },
        login: function() {
            if (_.isUndefined(this.loginWindow) &&
                !~window.location.href.indexOf('&session_state')) {
                this.setupView();
                this.openWindow(this.apiReqCode);
                this.timedCheck();
            }
            App.major.show(new this.loginView());
        },
        setupView: function() {
            this.loginView = Marionette.ItemView.extend({
                model: new Backbone.Model({
                    auth: ''
                }),
                template: "login/index.html",
                modelEvents: {
                    "change": "modelChanged"
                },
                modelChanged: function() {
                    this.render();
                }
            });
        },
        grantAccess: function(code) {



            this.token = new Login.token({
                grant_type: 'authorization_code',
                client_id: 'd5757c3d-32b5-419c-b770-3d81560005a8',
                client_secret: 'wEmd7jkTbBHmN/0VvI/4kXA/675cyHe0Mb8mgfHho1Q=',
                redirect_uri: window.location.href,
                code: code,
            });
            this.token.save();


            // App.trigger('api:login', Storage.getObject('auth'));
        },
        timedCheck: function() {
            var self = this,
                code, auth;
            var pollTimer =  window.setInterval(function() {
                try{
                    if (~self.loginWindow.location.href.indexOf('&session_state')) {
                        self.loginWindow.close();
                        window.clearInterval(pollTimer);
                        console.log('ddddd');
                        code = self.getParameterByName(self.loginWindow.location.href, 'code');
                        Storage.setObject('code', code);
                        self.grantAccess(code);
                    }
                } catch (e) {

                }
            }, 100);
        },
        getParameterByName: function (urLocation, name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(urLocation)||[,""])[1].replace(/\+/g, '%20'))||null
        },
        openWindow: function (req) {
            this.loginWindow = window.open(
                req,
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
    return Login;
});
