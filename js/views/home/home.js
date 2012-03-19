define(['jquery', 'order!underscore', 'backbone', 'views/events/list', 'text!templates/main/home.html'], function($, _, Backbone, eventsList, mainTemplate) {

  var mainHomeView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(mainTemplate);
    },
    render: function() {
      console.log('mainrenter');

      $(this.el).html(this.template());


      var events = new eventsList({
        el: $('#lower')
      });

      events.render();

      $('.nav li').removeClass('active');
      $('#home').addClass('active');

    }

  });



  return mainHomeView;
});
