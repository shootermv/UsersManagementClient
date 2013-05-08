require.config({
  baseUrl: "../../",
  urlArgs: 'cb=' + Math.random(),
  paths: {

    jquery: 'assets/js/libs/jquery',
    underscore: 'assets/js/libs/underscore',
    backbone: 'assets/js/libs/backbone',
    'backbone.localStorage': 'assets/js/libs/backbone.localStorage',
    jasmine: 'test/lib/jasmine',
    'jasmine-html': 'test/lib/jasmine-html',
    spec: 'test/jasmine/spec/'

  },
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
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});


window.store = "TestStore"; // override local storage store name - for testing

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  specs.push('spec/models/UsersSpec');
    /*
  specs.push('spec/views/ClearCompletedSpec');
  specs.push('spec/views/CountViewSpec');
  specs.push('spec/views/FooterViewSpec');
  specs.push('spec/views/MarkAllSpec');
  specs.push('spec/views/NewTaskSpec');
  specs.push('spec/views/TaskListSpec');
  specs.push('spec/views/task/TaskViewSpec');
  specs.push('spec/views/task/ViewTaskViewSpec');
  specs.push('spec/views/task/EditTaskViewSpec');
*/

  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});
