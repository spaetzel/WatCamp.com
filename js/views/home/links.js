define(['jquery', 'order!underscore', 'backbone',  'text!templates/main/links.html'], function($, _, Backbone, linksTemplate) {

  var linksView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(linksTemplate);
    },
    render: function() {

      $(this.el).html(this.template());

            $('.nav li').removeClass('active');
      $('#links').addClass('active');

    }

  });



  return linksView;
});
