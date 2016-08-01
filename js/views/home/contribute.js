define(['jquery', 'order!underscore', 'backbone',  'text!templates/main/contribute.html'], function($, _, Backbone, contributeTemplate) {

  var contributeView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(contributeTemplate);
    },
    render: function() {

      $(this.el).html(this.template());

            $('.nav li').removeClass('active');
      $('#contribute').addClass('active');

    }

  });



  return contributeView;
});
