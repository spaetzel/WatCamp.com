define([
    'jquery'
  , 'backbone'
  , 'underscore'
  , 'models/oneevent'
  , 'config'
  ],
function($, Backbone, _, OneEvent, config) { 
  var EventList = Backbone.Collection.extend({
    model: OneEvent,

    // The calendar items are in the "items" dictionary
    parse: function(data) { 
      return data.items;
    }, 

    url: function() { 
      return 'https://www.googleapis.com/calendar/v3/calendars/'
        + encodeURIComponent(config.calendarID)
        + '/events'
        ;
    }, 

    // This OVERRIDES backbone.sync
    sync: function(method, model, options) { 
      // console.log("method: " + method);
      // console.log("model: " + JSON.stringify(model));
      // console.log("options: " + JSON.stringify(options));


      // Assume method is always 'read'
      if (method !== 'read') { 
        console.error("Unsupported sync method: " + method);
        return;
      } // end if 

      var dateNow = new Date();
      var isoDate = dateNow.toISOString();

      extradata = { 
        key: config.apiKey,
        maxResults: config.maxResults,
        orderBy: 'startTime',
        singleEvents: 'true',
        timeMin: isoDate,
        fields: 'items(description,id,location,htmlLink,summary,start)' 
      } 

      var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: model.url(),
        processData: true,
      }, options);

      _.extend(options.data, extradata);

      // console.log("params: " + JSON.stringify(params));

      var result = $.ajax(params);
      return result;
      
    } // end sync 

  }); // end var

  return EventList;

}); // end function
