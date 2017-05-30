define(['jquery', 'order!underscore', 'backbone', 'text!templates/main/home.html'], function($, _, Backbone, mainTemplate) {

  var mainHomeView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(mainTemplate);
    },
    render: function() {

      $(this.el).html(this.template());

      $('.nav li').removeClass('active');
      $('#home').addClass('active');

    }

  });



  return mainHomeView;
});
