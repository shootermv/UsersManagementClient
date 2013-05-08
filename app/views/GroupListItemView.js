define([
    // Libs
    "backbone",

    // Templates
    'text!app/templates/users/GroupListItemView.html'
], function (Backbone, GroupListItemViewTmpl) {
    var GroupListItemView = Backbone.View.extend({
        tagName: "tr",


        render: function () {
            $(this.el).html(_.template(GroupListItemViewTmpl,this.model.toJSON()));
            return this;
        },




        initialize: function () {
            // listen to your model
            //  this.listenTo(this.model, 'change:selected', this.updateClass);

            //this.listenTo(this.model, 'change:name', this.changed);
        }
    });

    return GroupListItemView;

});
