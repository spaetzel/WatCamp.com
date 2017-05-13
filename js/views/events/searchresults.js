define(['jquery'
    , 'order!underscore'
    , 'backbone'
    , 'text!templates/events/searchresults.html'
    , 'models/eventlist'
    , 'models/oneevent'
    ], 
function($, _, Backbone, searchResultTemplate, EventList, OneEvent) {

  var searchResultView = Backbone.View.extend({
    tagName: 'li',

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(searchResultTemplate);
      // Update when we fetch. (How to replace just the list?)
      // this.listenTo(this.model, 'sync', this.render);
    },

    // Render form using template
    render: function() {
      $('ul#search-results').append(this.template(this.model.toJSON()));

      // I do not understand why this is even useful
      return this;
    } 

  });

  return searchResultView;
});
