define([
    // Libs
    "backbone",
    //Modules
    "app/views/GroupListItemView",
    "app/collections/GroupsCollection"

], function (Backbone, GroupListItemView, GroupsList) {



    var GroupsListView = Backbone.View.extend({

        tagName: "tbody",
        events: {
            "change": "change"
        },
        initialize: function () {
            this.user = this.options.user;
        },
        change: function (event) {
            var groupsList = new GroupsList();

            //insert selected groups
            $(this.el).find(':checkbox:checked').each(function (index, group) {


                groupsList.add({
                    id: (index + 1),
                    name: $(group).closest('tr').find('td:eq(1)').text()
                });

            });

            //console.log('groups change')

            this.user.set('groupsList', groupsList);
        },
        render: function (eventName) {
            _.each(this.model.models, function (group) {
                $(this.el).append(new GroupListItemView({ model: group }).render().el);
            }, this);
            return this;
        }
    });


    return GroupsListView;
});