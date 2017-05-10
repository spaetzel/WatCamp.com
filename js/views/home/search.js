define(['jquery'
    , 'order!underscore'
    , 'backbone'
    , 'text!templates/main/search.html'
    , 'models/eventlist'
    ], 
function($, _, Backbone, searchTemplate, EventList) {

  function getInput() { 
    var inputSoFar = _.escape(this.$('#searchterms').val());

    return inputSoFar;
  }; // end getInput

  function processSearch(model) { 
    searchString = getInput();

    // This should trigger a refresh
    model.fetch(searchString);

  }; // end processSearch

  var searchView = Backbone.View.extend({

    // I do not know where this bodyArea is defined.
    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(searchTemplate);
      // Update when we fetch. (How to replace just the list?)
      this.listenTo(this.model, 'sync', this.render);
    },

    // Render form using template
    render: function() {
      $(this.el).html(this.template());

      // Make top link "Search" active"
      $('.nav li').removeClass('active');
      $('#search').addClass('active');
    }, 

    // Register event handlers
    events: { 
      'click #submitsearchform': 'onSubmit',
      'keypress #searchterms': 'onKeypress',
    },

    // Event handlers
    onSubmit: function(evt) { 
      // Really you want to call the API here from 
      // the model.

      inputSoFar = getInput();
      processSearch(this.model);
      console.log("Input button submitted: " + inputSoFar);
    },

    onKeypress: function(evt) { 
      var ENTER_KEY = 13;
      if (evt.which == ENTER_KEY) { 
        processSearch(this.model);
        console.log("Enter key submitted: " + getInput());
      }
    } 

  });

  return searchView;
});
