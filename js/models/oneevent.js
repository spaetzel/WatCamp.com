define([
  'backbone'
  ],
function(Backbone) { 
  var OneEvent = Backbone.Model.extend({
    defaults: { 
      id: null,
      summary: null, // actually the title
      location: null,
      start: null,
      htmlLink: null,
      description: null
    } 

  }); // end OneEvent

  return OneEvent;

}); // end function
