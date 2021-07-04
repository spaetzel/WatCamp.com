var router;


// Filename: router.js
define(['jquery', 'underscore', 'backbone', 'views/home/home', 'views/home/calendar', 'views/home/contribute', 'views/home/links', 'views/home/search', 'collections/eventList'], function($, _, Backbone, mainHomeView, calendarView, contributeView,linksView,searchView, eventList) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      'calendar': 'showCalendar',
      'home': 'defaultAction',
      'contribute': 'showContribute',
      'links': 'showLinks',
      'search': 'showSearch',
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
    },
    showLinks: function(){
      var links = new linksView();
      links.render();
    },
    showSearch: function(){
      var eventListVar = new eventList();
      var search = new searchView({ model: eventListVar });
      search.render();
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
