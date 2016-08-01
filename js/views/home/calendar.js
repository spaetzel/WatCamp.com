define(['jquery', 'order!underscore', 'backbone',  'text!templates/main/calendar.html'], function($, _, Backbone, calendarTemplate) {

  var calendarView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(calendarTemplate);
    },
    render: function() {

      $(this.el).html(this.template());

            $('.nav li').removeClass('active');
      $('#calendar').addClass('active');

    }

  });



  return calendarView;
});
