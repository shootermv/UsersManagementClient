// Set the require.js configuration for your application.
require.config({

  baseUrl: "../",
  // Initialize the application with the main application file
  deps: ["UsersManagementClient/app/main"],

  paths: {
  /*

    // JavaScript folders
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
*/
    // Libraries
    jquery: "assets/js/libs/jquery",
    underscore: "assets/js/libs/underscore",
    backbone: "assets/js/libs/backbone",
    'backbone.localStorage': 'assets/js/libs/backbone.localStorage',
    text: "assets/js/plugins/text"
    //,
/*
    // Shim Plugin
    use: "../assets/js/plugins/use",
    text: "../assets/js/plugins/text"
*/
  },
/*
  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"
    },

    underscore: {
      attach: "_"
    }
  }*/
    shim: {

        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone'
        }
    }
});
