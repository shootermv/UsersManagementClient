
define([
    "app/namespace",

    // Libs
   /* "jquery",*/
    "backbone",
    'text!app/templates/users/UserListItemView.html'
], function (namespace,/* $,*/ Backbone, UserListItemViewTmpl) {

    var UserListItemView = Backbone.View.extend({
        tagName: "li",



        render: function () {
            $(this.el).html(_.template(UserListItemViewTmpl,this.model.toJSON()));
            return this;
        },




        initialize: function () {
            // listen to your model
            this.listenTo(this.model, 'change:selected', this.updateClass);

            this.listenTo(this.model, 'change:name', this.changed);
        },
        changed:function(){
            if (this.model.get('name').length>0) $(this.el).html(_.template(UserListItemViewTmpl,this.model.toJSON()));
        },
        updateClass: function () {

            (this.model.get('selected')) ? this.$el.addClass('active') : this.$el.removeClass('active');
        }
    });

    return UserListItemView;
});