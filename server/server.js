//

"use strict";

var express = require('express'),
    app = express(),
    server  = require('http').Server(app),
    bodyParser = require ('body-parser'),
    io = require('socket.io')(server),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({
      changeOrigin: true,
      ws: true
    });

require('babel-core/register');
require('./config/express')(app);
require('./routes')(app);
require('./auth')(app);

var models = require('./models');
var schools = require('./helpers/schoolFunctions');
var leagues = require('./helpers/leagueFunctions');
var teams = require('./helpers/teamFunctions');
var draft = require('./helpers/draftFunctions');
var drafts = {};
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;

    io.on('connection', function(socket) {

      socket.on('leaguePage', (data) => {
        let leagueId = data.leagueId;
        socket.join(leagueId);

        draft.checkDraftInProgress(leagueId, socket);
        io.to(leagueId).emit('update', leagueId);
      });

      socket.on('sendMessage', (data) => {
        let leagueId=data.leagueId;
        io.to(leagueId).emit('newMessage', data);
      });

      socket.on('startDraft', (leagueId)=> {
        draft.startDraft(io, leagueId);
        leagues.startDraft(io, leagueId);
      });

      socket.on('update', (data) =>{

        let leagueId= data.leagueId;
        draft.advance(leagueId, io);

      });

      socket.on('leave', function(data) {
        console.log('close connection', data.leagueId);
        socket.leave(data.leagueId)
        teams.turnOnAutoDraft(data.teamId);
      })

      socket.on('disconnect', function() {
        console.log('closing')
      });
    });

if (!isProduction) {
  var bundle = require('./bundle.js');
  bundle();
  app.all('/client/*', function(req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}



proxy.on('error', function(e) {
    console.log('Could not connect to proxy. Please try again...');
});



app.set('port', port);

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



