//

"use strict";

var express = require('express'),
    app = express(),
    server  = require('http').Server(app),
    bodyParser = require ('body-parser'),
    io = require('socket.io')(server);

require('babel-core/register');
require('./config/express')(app);
require('./routes')(app);
require('./auth')(app);

var models = require('./models');



    io.on('connection', function(socket) {
      console.log('socket connection', socket.rooms);
      socket.on('leaguePage', (data) => {
        console.log('leaguePage', data)
        let leagueId = data.leagueId;
        socket.join(leagueId);
        console.log('user joined room', leagueId)
        io.to(leagueId).emit('update', leagueId);
      });

      socket.on('sendMessage', (data) => {
        let leagueId=data.leagueId;
        io.to(leagueId).emit('newMessage', data);
      });

      socket.on('update', (data) =>{
        console.log('update', data)

        let leagueId= data.leagueId;
        io.to(leagueId).emit('update', leagueId);

      });

      socket.on('leave', function(data) {
        console.log('close connection');
        socket.leave(data.leagueId)
      })

      socket.on('disconnect', function() {
        console.log('closing')
      });
    });

app.set('port', (process.env.PORT || 3000));
models.sequelize.sync().then(function () {
  server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});



