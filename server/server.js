//

"use strict";

var express = require('express'),
    app = express(),
    server  = require('http').createServer(app),
    bodyParser = require ('body-parser'),
    io = require('socket.io')(server);

require('babel-core/register');
require('./config/express')(app);
require('./routes')(app, io);
require('./auth')(app);

var models = require('./models');


// io.on('connection', function(socket) {
//   app.socket = socket;
//   console.log('socket connection');
//   socket.on('leaguePage', (data) => {
//     let leagueId = data.leagueId;
//     socket.join(leagueId);
//     console.log('user joined room', leagueId)
//     io.to(leagueId).emit('update', leagueId);
//   })

//   socket.on('close', function() {
//     console.log('close connection');
//   })
// });


app.set('port', (process.env.PORT || 3000));
models.sequelize.sync().then(function () {
  server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});



