define(['jquery', 'order!underscore', 'backbone', 'text!templates/main/search.html'], function($, _, Backbone, searchTemplate) {

  var searchView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(searchTemplate);
    },
    render: function() {

      $(this.el).html(this.template());

            $('.nav li').removeClass('active');
      $('#search').addClass('active');

    }

  });

  return searchView;
});
