define([
  "backbone.localStorage",
  'app/models/UserModel'
  ], function ( Backbone, UserModel) {
    var store = new Backbone.LocalStorage(window.store || "Users"); // for testing purposes

    var UsersCollection = Backbone.Collection.extend({
        localStorage: store,
        model: UserModel,
        //for fetch
        url: "UsersManager/GetUsers"
    });

      return  UsersCollection;
  });
