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
var drafts = {};

    io.on('connection', function(socket) {

      socket.on('leaguePage', (data) => {
        let leagueId = data.leagueId;
        socket.join(leagueId);

        if (drafts[leagueId]) {
          let nextDraft = leagues.findNextDraftId(drafts[leagueId].round, drafts[leagueId].position);
          socket.emit('advance', {round: drafts[leagueId].round, position: drafts[leagueId].position, nextUpId:nextDraft.id, nextUpName: nextDraft.team_name});
        }
        io.to(leagueId).emit('update', leagueId);
      });

      socket.on('sendMessage', (data) => {
        let leagueId=data.leagueId;
        io.to(leagueId).emit('newMessage', data);
      });

      socket.on('startDraft', (leagueId)=> {
        drafts[leagueId] = {
          timer:60,
          round: 0,
          position: 0,
          drafting: true
        }
        let seconds = 60;
        drafts[leagueId].timer = setInterval(()=>{
          seconds--;
          io.to(leagueId).emit('timer', seconds)
          if (seconds < 1) {
            clearInterval(drafts[leagueId].timer);
          }
        }, 1000);
        leagues.startDraft(io, leagueId);
      });

      socket.on('update', (data) =>{
        let leagueId= data.leagueId;
        console.log('update', drafts[leagueId].timer)
        clearInterval(drafts[leagueId].timer);
        io.to(leagueId).emit('update', leagueId);
        if (drafts[leagueId].position<5) {
          drafts[leagueId].position++;
        } else {
          drafts[leagueId].position = 0;
          drafts[leagueId].round++;
        }
        let nextDraft = leagues.findNextDraftId(drafts[leagueId].round, drafts[leagueId].position);
        io.to(leagueId).emit('advance', {round: drafts[leagueId].round, position: drafts[leagueId].position, nextUpId:nextDraft.id, nextUpName: nextDraft.team_name});
        if (drafts[leagueId].round < 10) {
          let seconds = 60;
          drafts[leagueId].timer = setInterval(()=>{
            seconds--;
            console.log('seconds', seconds)
            io.to(leagueId).emit('timer', seconds)
            if (seconds < 1) {
              clearInterval(drafts[leagueId].timer);
            }
          }, 1000);
        }
      });

      socket.on('leave', function(data) {
        console.log('close connection', data.leagueId);
        socket.leave(data.leagueId)
      })

      socket.on('disconnect', function() {
        console.log('closing')
      });
    });

app.set('port', (process.env.PORT || 3000));

models.NCAA_Team.sync().then(function () {
  models.NCAA_Team.findAll().then(function(teams) {
    if (!teams.length) {
      schools.fetchAllSchools();
    }
  });
  server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});



