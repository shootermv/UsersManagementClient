define([

    "backbone",
    'app/models/GroupModel'
], function ( Backbone, GroupModel) {
    var GroupsList = Backbone.Collection.extend({
        model: GroupModel,
        url: "UsersManager/GetRoles"
    });
    return GroupsList;
});
