define([
  'backbone'
  , 'config'
  ],
function(Backbone, config) { 
  var OneEvent = Backbone.Model.extend({
    defaults: { 
      id: null,
      summary: null, // actually the title
      location: null,
      start: null,
      htmlLink: null,
      description: null,

      // This is gross but I do not know how else to pass 
      // the timezone into a template
      timezone: config.timezone
    } 

  }); // end OneEvent

  return OneEvent;

}); // end function
