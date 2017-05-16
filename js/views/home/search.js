define(['jquery'
    , 'order!underscore'
    , 'backbone'
    , 'text!templates/main/search.html'
    , 'models/eventlist'
    , 'models/oneevent'
    , 'views/events/searchresults'
    , 'views/events/noresults'
    ], 
function($, _, Backbone, searchTemplate, EventList, OneEvent,
    SearchResultsView, NoResultsView) {

  function getInput() { 
    var inputSoFar = _.escape(this.$('#searchterms').val());

    return inputSoFar;
  }; // end getInput

  function processSearch(model) { 
    searchString = getInput();

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
    },

    // Render form using template
    render: function() {

      // Make top link "Search" active"
      $('.nav li').removeClass('active');
      $('#search').addClass('active');

      $(this.el).html(this.template(this.model.toJSON()));
      
      // Populate the list
      var $list = this.$('ul.#search-results').empty();

      // If you searched for something and there were no results, 
      // then display an error.
      querystring = this.model.getLatestQuery();
      //console.log("querystring = '" + querystring + "'"
      //  + ", length = " + querystring.length);
      if (querystring && 0 !== querystring.length && this.model.isEmpty()) { 
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

      inputSoFar = getInput();
      processSearch(this.model);
      // console.log("Input button submitted: " + inputSoFar);
    },

    onKeypress: function(evt) { 
      var ENTER_KEY = 13;
      if (evt.which == ENTER_KEY) { 
        processSearch(this.model);
        // console.log("Enter key submitted: " + getInput());
      }
    } 

  });

  return searchView;
});
