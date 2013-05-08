define([
    "backbone"
], function ( Backbone) {
    var GroupModel = Backbone.Model.extend({
        defaults: {
            "id": null,
            "name": ""
        }

    });

    return GroupModel;
});