define([
  "app/namespace",

  // Libs
  "backbone",

  // Modules
   //collections
  "app/collections/UsersCollection",
  //views
  "app/views/UsersListView",
  "app/views/HeaderView",
  "app/views/UserDetailsView",
  "app/views/SearchView",
  "app/views/PaginatorView",
  //models
  "app/models/UserModel"
],

function(namespace, Backbone, UsersCollection, UsersListView, HeaderView, UserDetailsView, SearchView, Paginator, UserModel) {


    var Router = Backbone.Router.extend({

        routes: {
            "": "list",
            "users/page/:page": "list",
            "users/new": "newUser",
            "users/:id": "userDetails"
        },
        initialize: function () {


            this.headerView = new HeaderView();
            $('.header-actions').html(this.headerView.el);
            this.SearchView = new SearchView();
            $('ul.top-nav').html(this.SearchView.el);



        },
        list: function (page) {

            var self = this;

            if (this.usersList == null) {

                //for testing...
                this.usersList = new UsersCollection([
                    {"id":1,"name":"moshe","email":"shootermv@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":2,"name":"sasha","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":3,"name":"pasha","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":4,"name":"kasha","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":5,"name":"vasia","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":6,"name":"petia","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":7,"name":"ivan","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":8,"name":"vova","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":9,"name":"shurik","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":10,"name":"papa","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":11,"name":"ddd","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":12,"name":"fff","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false},
                    {"id":13,"name":"jjj","email":"sasha@gmail.com","groupsList":[{"id":1,"name":"Administrator"}],"password":"","selected":false}
                ]);


                var p = page ? parseInt(page, 10) : 1;
                self.UsersListView = new UsersListView({ model: self.usersList, page: p });
                $('#sidebar').html(self.UsersListView.render().el);
                $('#sidebar').append(new Paginator({ model: self.usersList, page: p }).render().el);



                //the real thing:
                /*
                this.usersList.fetch({
                    success: function () {

                        var p = page ? parseInt(page, 10) : 1;

                        self.UsersListView = new UsersListView({ model: self.usersList, page: p });
                        $('#sidebar').html(self.UsersListView.render().el);
                        //paginator
                        $('#sidebar').append(new Paginator({ model: self.usersList, page: p }).render().el);

                    } //end of success
                })//end of fetch
                */

            }
            else if(self.usersList.models.length==0){//no users found -can happen after search
                $('#sidebar').html('<span class="no-users">לא נמצאו משתמשים</span>');
            }
            else//if already fetched
            {


                var p = page ? parseInt(page, 10) : 1;
                self.UsersListView = new UsersListView({ model: self.usersList, page: p });
                $('#sidebar').html(self.UsersListView.render().el);


                //paginator
                $('#sidebar').append(new Paginator({ model: self.usersList, page: p }).render().el);

            }


        },

        userDetails: function (id) {

            if (this.usersList) {
                //unselect prevously selected
                if (this.user) this.user.set({ 'selected': false });


                this.user = this.usersList.get(id);

                //select current
                this.user.set({ 'selected': true });


                if (this.UserDetailsView) this.UserDetailsView.close();
                this.UserDetailsView = new UserDetailsView({ model: this.user });

                //update header too
                //passing model
                this.headerView.model = this.UserDetailsView.model;

                $('#content').html(this.UserDetailsView.render().el);
            }
            else {
                this.list();
            }
        },
        newUser: function () {

            if (this.UserDetailsView) this.UserDetailsView.close();
            this.UserDetailsView = new UserDetailsView({ model: new UserModel() });
            $('#content').html(this.UserDetailsView.render().el);

        }


    });



  // Shorthand the application namespace
  var app = namespace.app;

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    app.router = new Router();
    Backbone.history.start();
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });

});
