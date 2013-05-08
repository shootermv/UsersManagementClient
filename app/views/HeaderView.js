define([
    "app/namespace",

    // Libs
    "backbone",

    // Modules
    "app/collections/GroupsCollection",
    'text!app/templates/users/HeaderView.html',
    "app/utils"
], function (namespace, Backbone, GroupsList, HeaderViewTmpl, utils) {



    var HeaderView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            $(this.el).html(_.template(HeaderViewTmpl));
            return this;
        },

        events: {
            "click .new": "newUser",
            "click .save": "beforeSave",
            "click .delete": "deleteUser"
        },

        newUser: function (event) {
            namespace.app.router.navigate("users/new", true);
            //passing model
            this.model =  namespace.app.router.UserDetailsView.model;
            return false;
        },

        beforeSave: function (event) {
            var check = this.model.validateAll();
            if (check.isValid === false) {
                utils.displayValidationErrors(check.messages);
                return false;
            }
            this.saveUser();
            return false;
        },

        saveUser: function () {
            var self = this;
            this.model.set({
                name: $('#name').val()
            });

            if (this.model.isNew()) {

                /*
                namespace.app.router.usersList.create(this.model, {
                    wait: true,
                    success: function (model) {

                      //  utils.showAlert('Success!', 'משתמש חדש נוצר בהצלחה', 'alert-success');
                        //add event is fired
                    }
                });*/


                //for testing:
                var usersLength=namespace.app.router.usersList.models.length;
                this.model.set('id',usersLength+1);
                namespace.app.router.usersList.add(this.model);
                utils.showAlert('', 'משתמש חדש נוצר בהצלחה', 'alert-success');

            } else {

                /*
                this.model.save(null, {
                    success: function (model) {
                        //self.render();

                        //parse Groups array into collection:
                        var tempGroups = namespace.app.user.get('groupsList');
                        namespace.app.user.set('groupsList', new GroupsList(tempGroups));

                        namespace.app.navigate('users/' + model.id, false);
                        utils.showAlert('Success!', 'שינויים נשמרו בהצלחה', 'alert-success');
                    },
                    error: function () {
                        utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                    }
                });
                */


                //for testing
                utils.showAlert('', 'שינויים נשמרו בהצלחה', 'alert-success');
            }

            return false;
        },

        deleteUser: function (event) {
            /*
            var name = this.model.get('name')
            this.model.destroy({
                headers: {
                    name: name
                },
                success: function () {
                    //utils.showAlert('Success!', 'משתמש בשם ' + name + ' נמחק בהצלחה ', 'alert-success');

                }
            });
            */


            //for testing
           var name=this.model.get('name');
            namespace.app.router.usersList.remove(this.model);
            utils.showAlert('', 'משתמש נמחק בהצלחה', 'alert-success');

            return false;


        }


    });

    return HeaderView;
});