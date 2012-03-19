define(['jquery', 'order!underscore', 'backbone', 'views/events/list', 'text!templates/main/index.html'], function($, _, Backbone, eventsList, mainTemplate) {

  var mainHomeView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(mainTemplate);
    },
    render: function() {
      console.log('mainrenter');

      $(this.el).html(this.template({
        model: this.model
      }));


      var events = new eventsList({
        el: $('#lower')
      });

      events.render();

    }

  });



  return mainHomeView;
});
