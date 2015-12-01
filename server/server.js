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
var schools = require('./helpers/schoolFunctions');
var leagues = require('./helpers/leagueFunctions');


    io.on('connection', function(socket) {
      var round = 0,
          position = 0,
          timer;
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

      socket.on('startDraft', (leagueId)=> {
        let seconds = 60;
        timer = setInterval(()=>{
          seconds--;
          console.log('seconds', seconds)
          io.to(leagueId).emit('timer', seconds)
          if (seconds < 1) {
            clearInterval(timer);
          }
        }, 1000);
        leagues.startDraft(io, leagueId);
      });

      socket.on('update', (data) =>{
        console.log('update', data)
        let leagueId= data.leagueId;
        clearInterval(timer);
        io.to(leagueId).emit('update', leagueId);
        if (position<5) {
          position++;
        } else {
          position = 0;
          round++;
        }
        let nextDraft = leagues.findNextDraftId(round, position);
        io.to(leagueId).emit('advance', {round: round, position: position, nextUpId:nextDraft.id, nextUpName: nextDraft.team_name});
        let seconds = 60;
        timer = setInterval(()=>{
          seconds--;
          console.log('seconds', seconds)
          io.to(leagueId).emit('timer', seconds)
          if (seconds < 1) {
            clearInterval(timer);
          }
        }, 1000);
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
  models.NCAA_Team.findAll().then(function(teams) {
    if (!teams.length) {
      schools.fetchAllSchools();
    }
  });
  server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});



