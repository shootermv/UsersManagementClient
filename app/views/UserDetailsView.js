define([
    "app/namespace",

    // Libs

    "backbone",
    'text!app/templates/users/UserDetailsView.html',
    "app/utils",
    "app/collections/GroupsCollection",
    "app/views/GroupsListView"
], function (namespace, Backbone, UserDetailsViewTmpl, utils, GroupsList, GroupsListView) {



    var UserDetailsView = Backbone.View.extend({


        initialize: function () {

        },
        render: function () {
            $(this.el).html(_.template(UserDetailsViewTmpl,this.model.toJSON()));

            utils.hideAlert();

            var self = this;






            if (namespace.app.router.groupsList == null) {
                /*
                namespace.app.router.groupsList = new GroupsList();

                namespace.app.router.groupsList.fetch({
                    success: function () {
                        //correct way to place groups:
                        $(self.el).find('table tbody').replaceWith(new GroupsListView({ model: namespace.app.router.groupsList ,user:self.model}).render().el);
                        //place groups

                        $(self.el).find('table tr:not(:first)').each(function (index, group) {
                            if (self.foundInUserGroups($(group).find('td:eq(1)').text()))
                                $(group).find(':checkbox').prop('checked', 'true');
                        });
                    }
                }); //end of fetch
                */

                //for testing:



                namespace.app.router.groupsList = new GroupsList([{"id":1,"name":"Administrator"},{"id":2,"name":"Shomer"}]);
                this.GroupsListView = new GroupsListView({ model: namespace.app.router.groupsList, user: self.model });

                $(this.el).find('table tbody').replaceWith(this.GroupsListView.render().el);
                $(this.el).find('table tr:not(:first)').each(function (index, group) {
                    if (self.foundInUserGroups($(group).find('td:eq(1)').text()))
                        $(group).find(':checkbox').prop('checked', 'true');
                });
            }
            else {

                //correct way to place groups:

                this.GroupsListView = new GroupsListView({ model: namespace.app.router.groupsList, user: self.model });
                $(this.el).find('table tbody').replaceWith(this.GroupsListView.render().el);
                $(this.el).find('table tr:not(:first)').each(function (index, group) {
                    if (self.foundInUserGroups($(group).find('td:eq(1)').text()))
                        $(group).find(':checkbox').prop('checked', 'true');
                });

            }

            return this;
        },
        foundInUserGroups: function (groupname) {
            var result = false;
            if (!this.model.get('groupsList')) return false;

            _(this.model.get('groupsList').models).each(function (item) {
                if (item.get('name') === groupname) {
                    result = true;
                }

            }, this);
            return result;
        },
        events: {
            "change": "change"
        },
        change: function (event) {
            // Remove any existing alert message
           utils.hideAlert();

            // Apply the change to the model
            var target = event.target;
            var change = {};
            change[target.name] = target.value;
            this.model.set(change);
        //    console.log(target.name);



            // Run validation rule (if any) on changed item
            var check = this.model.validateItem(target.id);
            if (check.isValid === false) {
               utils.addValidationError(target.id, check.message);
            } else {
               utils.removeValidationError(target.id);
            }

        },

        close: function () {
            $(this.el).unbind();
            $(this.el).empty();
        }

    });


    return UserDetailsView;
});