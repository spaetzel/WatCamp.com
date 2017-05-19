About WatCamp.com
====

This is a collaborative calendar to display technology events in the Waterloo, Ontario region.

It pulls data in the shared [Google Calendar](http://www.google.com/calendar/embed?src=nlkc39jt4p0nbc4pk9pj7p5fh0%40group.calendar.google.com&ctz=America/New_York). Anyone can request access to the calendar by visiting [http://watcamp.com/#contribute](http://watcamp.com/#contribute). 

The site is built using [Backbone.js](http://documentcloud.github.com/backbone/) to pull data from the calendar using [Yahoo Pipes](http://pipes.yahoo.com/spaetzel/watcamp) to format Google Calendar's [Raw RSS Feed](http://www.google.com/calendar/feeds/nlkc39jt4p0nbc4pk9pj7p5fh0%40group.calendar.google.com/public/basic).

Deployment
----------

To get calendar search working, you need a Google API key. Generate
one from <https://console.developers.google.com> , and enable 
the Google Calendar API. 

Then copy `config.js.example` to `config.js` and edit in your API key
(and change other parameters as you see fit). 
