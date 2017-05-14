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
    }, 


    /* Dates can be either { start: { date: "2017-05-31" }} or 
     * { start: { timeZone: "America/Toronto", dateTime:
     * "2017-05-31T22:00:00-04:00" } } 
     * 
     * I need to pull a datetime string out of this in either case.
     */

      
      extractHumanDate: function(startdate) { 
        var datestring;  
        var datefmt;
        var options;

        if (typeof startdate.date !== 'undefined' 
            && startdate.date !== null) { 
          datestring = startdate.date;
          options = { 
            weekday: "short"
            , month: "short"
            , day: "2-digit"
          } 
         
        } else if (typeof startdate.dateTime !== 'undefined'
            && startdate.dateTime !== null) { 
          datestring = startdate.dateTime;
          options = { 
            weekday: "short"
            , month: "short"
            , day: "2-digit"
            , hour: "2-digit"
            , minute: "2-digit"
          } 
        } // end if 

        if (datestring) { 
          var dateobj = new Date(datestring);
          
          fmt = new Intl.DateTimeFormat( 'en-US', options);

          return fmt.format(dateobj);
          
        } // end of dateobject

        return "TBA";
      } // end extractHumanDate


  }); // end OneEvent

  return OneEvent;

}); // end function
