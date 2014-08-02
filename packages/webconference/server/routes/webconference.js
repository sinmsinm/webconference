'use strict';

// The Package is past automatically as first parameter
module.exports = function(Webconference, app, auth, database) {

  app.get('/webconference/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/webconference/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/webconference/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/webconference/example/render', function(req, res, next) {
    Webconference.render('index', {
      package: 'webconference'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
