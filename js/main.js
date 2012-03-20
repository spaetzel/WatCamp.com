require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    jqueryUi: 'libs/jquery/jquery-ui.min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    text: 'libs/require/text',
    templates: '../templates',
    bootstrap: 'libs/bootstrap/bootstrap.min'
  }
});

require([

  'app'
], function(App, $){
  App.initialize();
});
