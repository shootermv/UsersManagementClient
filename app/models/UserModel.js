define([
    'backbone.localStorage',
    "app/collections/GroupsCollection"
], function ( Backbone, GroupsList) {
    var store = new Backbone.LocalStorage(window.store || "Users"); // for testing purposes

    var UserModel = Backbone.Model.extend({
        localStorage: store,
        defaults: {
            "id": null,
            "name": "",
            "email": "",
            "password": "",
            "groupsList": [],
            "selected": false
        },

        initialize: function () {
            this.validators = {};




            this.validators.name = function (value) {
                return value.length > 0 ? { isValid: true} : { isValid: false, message: "You must enter a name" };
            };
            function validateEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                return re.test(email);
            }
            this.validators.email = function (value) {
                if (value.length < 0)
                    return { isValid: false, message: "You must enter email" };
                else if (!validateEmail(value))
                    return { isValid: false, message: "You must enter correct email" };
                else
                    return { isValid: true };
            };



            var groupsArr = this.get('groupsList');
            this.set('groupsList', new GroupsList(groupsArr));

        },

        validateItem: function (key) {
            return (this.validators[key]) ? this.validators[key](this.get(key)) : { isValid: true };
        },

        // TODO: Implement Backbone's standard validate() method instead.
        validateAll: function () {

            var messages = {};

            for (var key in this.validators) {
                if (this.validators.hasOwnProperty(key)) {
                    var check = this.validators[key](this.get(key));
                    if (check.isValid === false) {
                        messages[key] = check.message;
                    }
                }
            }

            return _.size(messages) > 0 ? { isValid: false, messages: messages} : { isValid: true };
        },

        methodUrl: {
            'create': 'UsersManager/CreateUser',
            'update' :'UsersManager/UpdateUser/',
            'delete': 'UsersManager/DeleteUser/'
        },
        sync: function (method, model, options) {
            if (model.methodUrl && model.methodUrl[method.toLowerCase()]) {
                options = options || {};
                options.url = model.methodUrl[method.toLowerCase()];
            }
            Backbone.sync(method, model, options);
        }
    });
    return UserModel;
});
