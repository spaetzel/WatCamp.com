define(['jquery'
    , 'order!underscore'
    , 'backbone'
    , 'text!templates/events/errorsearch.html'
    ], 
function($, _, Backbone, errorSearchTemplate) {

  var errorSearchView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function(searchquery) {
      this.template = _.template(errorSearchTemplate);
    },

    // Render form using template
    render: function(msg) {
      data = { errormsg: msg };

      $('ul#searchResults').replaceWith(this.template(data));

      return this;
    } 

  });

  return errorSearchView;
});
