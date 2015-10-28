/**
 * Created by lmele on 26.10.2015.
 */

define(['backbone', 'marionette', 'underscore','app'], function (Backbone, Marionette, _, App) {

    "use strict";

    var Storage = App.module('Storage');
    Storage.Controller = Marionette.Controller.extend({
        initialize: function() {
            console.log('dd');
            this.storage = true;
            if (!localStorage) {
                this.storage = false;
                alert('localStorage not supported!');
            }
        },
        setObject: function(key, object) {
            if (this.storage) {
                localStorage.setItem(key, JSON.stringify(object));
            }
        },
        getObject: function(key) {
            if (this.storage) {
                return JSON.parse(localStorage.getItem(key));
            }
        },
    });
    Storage.inst = new Storage.Controller();
    return Storage.inst;
});
