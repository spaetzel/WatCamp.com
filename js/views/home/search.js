define(['jquery'
    , 'order!underscore'
    , 'backbone'
    , 'text!templates/main/search.html'
    , 'models/eventlist'
    , 'models/oneevent'
    , 'views/events/searchresults'
    , 'views/events/noresults'
    , 'views/events/errorsearch'
    ], 
function($, _, Backbone, searchTemplate, EventList, OneEvent,
    SearchResultsView, NoResultsView, ErrorSearchView) {

  function getInput() { 
    var inputSoFar = _.escape(this.$('#searchterms').val());

    return inputSoFar;
  }; // end getInput

  function processSearch(model) { 
    var searchString = getInput();

    // This should trigger a refresh
    model.fetch({ data: {q: searchString} } );

  }; // end processSearch

  var searchView = Backbone.View.extend({

    // This is defined in index.html
    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(searchTemplate);
      // Update when we fetch. (How to replace just the list?)
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(Backbone, 'api-error', this.onAjaxError);
    },

    // Render form using template
    render: function() {

      // Make top link "Search" active"
      $('.nav li').removeClass('active');
      $('#search').addClass('active');

      // Add latest query to the template
      var data = { latestquery: this.model.getLatestQuery()}

      $(this.el).html(this.template(data));
      
      // Populate the list
      var $list = this.$('ul.#search-results').empty();

      // If you searched for something and there were no results, 
      // then display an error.

      var querystring = this.model.getLatestQuery();
      var latestError = this.model.getLatestError();

      if (0 !== latestError.length) { 
        var errorsearch = new ErrorSearchView();
        errorsearch.render(latestError);
      
      } else if (querystring 
          && 0 !== querystring.length 
          && this.model.isEmpty()) { 
        // You should not need to check if querystring exists, because
        // it is initialized to the empty string. But better to be safe 
        // than have the page crash.

        var noresults = new NoResultsView();
        noresults.render(querystring);

      } else { 
        this.model.each(function(oneevent) { 
          var item = new SearchResultsView({model: oneevent});
          item.render();
        }, this); // end each 

      } // end if no results

      return this;
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

      var inputSoFar = getInput();
      processSearch(this.model);
      // console.log("Input button submitted: " + inputSoFar);
    }, // end onSubmit

    onKeypress: function(evt) { 
      var ENTER_KEY = 13;
      if (evt.which == ENTER_KEY) { 
        processSearch(this.model);
        // console.log("Enter key submitted: " + getInput());
      }
    }, // end onKeypress

    onAjaxError: function(evt) { 
      this.render();
    } // end onAjaxError

  });

  return searchView;
});
