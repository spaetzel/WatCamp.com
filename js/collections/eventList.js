define([
    'jquery'
  , 'backbone'
  , 'underscore'
  , 'models/event'
  , 'config'
  ],
function($, Backbone, _, event, config) { 
  var eventList = Backbone.Collection.extend({

    model: event,

    // This is an instance variable, I think.
    // It is the text of the latest search
    latestquery: '',

    // This stores a string with an error code, if
    // the AJAX call or Google API call fails.
    latestError: '',

    getLatestQuery: function() { 
      return this.latestquery;
    }, 

    getLatestError: function() { 
      return this.latestError;
    },

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

      // Reset the latestError so we do not render the error page again
      this.latestError = '';


      // Assume method is always 'read'
      if (method !== 'read') { 
        console.error("Unsupported sync method: " + method);
        return;
      } // end if 

      this.latestquery = options.data.q;

      var dateNow = new Date();
      var isoDate = dateNow.toISOString();

      extradata = { 
        key: config.apiKey,
        maxResults: config.maxResults,
        orderBy: 'startTime',
        singleEvents: 'true',
        timeMin: isoDate,
        fields: 'items(description,id,location,htmlLink,summary,start)' 
      };

      var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: model.url(),
        processData: true,
        timeout: 5000,
      }, options);

      _.extend(options.data, extradata);

      // Grr. The "this" in .done and .fail is different than the
      // "this" here. 
      // http://stackoverflow.com/questions/3708110/jquerys-ajax-call-to-a-javascript-class-method
      thisCollection = this;


      var result = $.ajax(params)
        .done(function(result) { 
          // Example: Calling a calendar that does not exist.
          // To reproduce, mess up config.calendarID

          // The call can get status 200, but the actual status 
          // may be something else. If so then we should note this.
          // However, the sync event will still be triggered, so 
          // there is no point in triggering another event.

          // Update: NOPE. The sync event is called BEFORE the .done function
          // sometimes, so we have to RE-trigger the refresh. But this 
          // might lead to a double refresh of the page, which is
          // ugly.

          if (result.error) { 
            retcodeStatus = "Got GAPI error. " + result.error.code + ": " 
              + result.error.message;
            thisCollection.latestError = retcodeStatus;
            // console.log("Got GAPI error: " + thisCollection.getLatestError());
            Backbone.trigger('api-error', retcodeStatus);
          } // end if error

        })
        .fail(function(result) { 
          // Example: calling the wrong URL, and getting a timeout.
          // To reproduce, mess up the www.googleapis.com URL
          retcodeStatus = "AJAX call failed. " + result.status
            + ": " + result.statusText;
          thisCollection.latestError = retcodeStatus;
          // console.log("Got AJAX error: " + thisCollection.getLatestError());

          // The sync event will NOT be fired in this case, so 
          // fire our own.
          Backbone.trigger('api-error', retcodeStatus);
        });
      return result;
      
    } // end sync 

  }); // end var

  return eventList;

}); // end function
