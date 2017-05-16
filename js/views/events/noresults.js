define(['jquery'
    , 'order!underscore'
    , 'backbone'
    , 'text!templates/events/noresults.html'
    ], 
function($, _, Backbone, noResultsTemplate) {

  var noResultView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function(searchquery) {
      this.template = _.template(noResultsTemplate);
    },

    // Render form using template
    render: function(querystring) {
      data = { query: querystring };

      $('ul#search-results').replaceWith(this.template(data));

      // I do not understand why this is even useful
      return this;
    } 

  });

  return noResultView;
});
