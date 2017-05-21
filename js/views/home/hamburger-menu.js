define(['jquery', 'order!underscore', 'backbone'], function($, _, Backbone) {

  var hamburgerMenuView = Backbone.View.extend({

    el: $('.navbar'),

    initialize: function() { 
    }, 

    render: function() {
    },

    events: { 
      'click .btn.btn-navbar': 'toggleHamburgerMenu'
    }, 

    toggleHamburgerMenu: function(evt) { 
      $('.nav-collapse').toggleClass("active");
    } // end toggleHamburgerMenu

  });



  return hamburgerMenuView;
});
