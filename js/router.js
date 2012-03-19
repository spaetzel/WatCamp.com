var router;


// Filename: router.js
define(['jquery', 'underscore', 'backbone', 'views/home/home', 'views/home/calendar', 'views/home/contribute'], function($, _, Backbone, mainHomeView, calendarView, contributeView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'calendar': 'showCalendar',
      'home': 'defaultAction',
      'contribute': 'showContribute',
      // Default
      '*actions': 'defaultAction'
    },

    defaultAction: function(actions) {

      // We have no matching route, lets display the home page
      var homeView = new mainHomeView();
      homeView.render();

    },
    showCalendar: function(source) {
      var calendar = new calendarView();
      calendar.render();
 

    },
    showContribute: function(){
      var contribute = new contributeView();
      contribute.render();
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
