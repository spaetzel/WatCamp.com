define(['jquery'
    , 'order!underscore'
    , 'backbone'
    , 'text!templates/events/searchresults.html'
    , 'models/oneevent'
    ], 
function($, _, Backbone, searchResultTemplate, OneEvent) {

  var searchResultView = Backbone.View.extend({
    tagName: 'li',

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(searchResultTemplate);
    },

    // Render form using template
    render: function() {
      // From: https://lostechies.com/derickbailey/2012/04/26/view-helpers-for-underscore-templates/

      data = this.model.toJSON();
      _.extend(data, { extractHumanDate: this.model.extractHumanDate } );

      $('ul#search-results').append(this.template(data));

      // I do not understand why this is even useful
      return this;
    } 

  });

  return searchResultView;
});
