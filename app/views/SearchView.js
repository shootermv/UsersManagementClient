
define([
    "app/namespace",

    // Libs

    "backbone",
    "app/collections/UsersCollection",
    'text!app/templates/users/SearchView.html'
], function (namespace, Backbone,UsersCollection, SearchViewTmpl) {

    var SearchView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },
        events: {
            'click .btn': 'search'
        },
        search: function (event) {
            var term = $(this.el).find('input').val();

            //show all the users if term is empty
            if (term.length == 0) { namespace.app.router.usersList = null; namespace.app.router.list(); return; }


            //to do -full collection must be searched because after filter the search will be limited

            var filtered = _.filter(namespace.app.router.usersList.models, function (item) {
                return item.get("name").toLowerCase().indexOf(term) >= 0;
            });

            namespace.app.router.usersList = new UsersCollection(filtered);
            namespace.app.router.list();


        },
        render: function () {
            $(this.el).html(_.template(SearchViewTmpl));
            return this;
        }
    });
    return SearchView;
});