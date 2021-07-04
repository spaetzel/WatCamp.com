define(['jquery', 'order!underscore', 'backbone'], function($, _, Backbone) {

  var hamburgerMenuView = Backbone.View.extend({

    initialize: function(options) { 
      // Add a class to all menu items so we can tell when 
      // they have been clicked.
      _.extend(this, options.el);


      $('ul.nav li').addClass('navitem');
    }, 

    render: function() {
    },

    events: { 
      'click .btn.btn-navbar': 'toggleHamburgerMenu',
      'click .navitem': 'onItemClick',
    }, 

    toggleHamburgerMenu: function(evt) { 
      $('.nav-collapse').toggleClass('active');
    }, // end toggleHamburgerMenu

    onItemClick: function(evt) { 
      // Re-hide menu if an item has been clicked
      $('.nav-collapse').removeClass('active');
    },

  });



  return hamburgerMenuView;
});
