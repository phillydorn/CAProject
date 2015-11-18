//

"use strict";

var express = require('express'),
    app = express(),
    server  = require('http').Server(app),
    bodyParser = require ('body-parser'),
    io = require('socket.io')(server);

require('babel-core/register');
require('./config/express')(app);
require('./routes')(app, io);
require('./auth')(app);

var models = require('./models');




app.all('*', (req, res, next) => {
  console.log('url', req.url);
  next()
});

app.set('port', (process.env.PORT || 3000));
models.sequelize.sync().then(function () {
  server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});



