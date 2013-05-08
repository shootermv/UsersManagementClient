define([
    "app/namespace",

    // Libs
    "backbone",
    "app/views/UserListItemView",
    "app/collections/GroupsCollection"
], function (namespace, Backbone, UserListItemView, GroupsList) {

      var UsersListView = Backbone.View.extend({
        tagName: "ul",

        initialize: function () {

            var self = this;
            $(self.el).attr('class', 'nav nav-list bs-docs-sidenav');

            this.model.bind("reset", this.render, this);



            this.model.bind("add", function (user) {
                console.log('add event fired')


                //parse Groups array into collection:
                var tempGroups = user.get('groupsList');
                user.set('groupsList', new GroupsList(tempGroups));


                $(self.el).append(new UserListItemView({ model: user }).render().el);//add user to list
                 namespace.app.router.navigate('users/' + user.id, true);


            });


            this.model.bind("remove", function (user) {
                var viewToRemove = new UserListItemView({ model: user });

                $('li.active').remove();



                //select the first user
                if (namespace.app.router.usersList.models.length > 0) {
                    namespace.app.router.list();

                } else {
                    $('#name').val('')
                }

            });
        },


        render: function (eventName) {
            $(this.el).empty(); //clean

            var users = this.model.models;
            var len = users.length;
            var startPos = (this.options.page - 1) * 6;
            var endPos = Math.min(startPos + 6, len);
            for (var i = startPos; i < endPos; i++) {
                $(this.el).append(new UserListItemView({ model: users[i] }).render().el);
            }



            //select the first user of current page
            namespace.app.router.userDetails(users[startPos].get('id'));



            return this;
        }

    });

    return UsersListView;
});