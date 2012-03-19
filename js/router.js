var router;


// Filename: router.js
define(['jquery', 'underscore', 'backbone', 'views/home/main'], function($, _, Backbone, mainHomeView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'calendar': 'showCalendar',
      // Default
      '*actions': 'defaultAction'
    },

    defaultAction: function(actions) {

      // We have no matching route, lets display the home page
      var homeView = new mainHomeView();
      homeView.render();

    },
    showCalendar: function(source) {

 

    }
  });

  var initialize = function() {
      router = new AppRouter;
      Backbone.history.start();
      };
  return {
    initialize: initialize
  };

});
