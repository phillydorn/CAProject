//
var express = require('express');
    app = express(),
    server  = require('http').createServer(app),
    bodyParser = require ('body-parser'),
    WebSocketServer = require('ws').Server,
    CLIENTS = {};


require('./config/express')(app);
require('./auth')(app);
require('./routes')(app);

var models = require('./models');





var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  console.log('ws connection');
  app.use(function(req, res) {
    CLIENTS[req.user.id] = ws;
    // console.log('req', req)

  })
  console.log('CLIENTs', CLIENTS)
  ws.on('message', function (message) {
    console.log('received')
  });
  ws.on('close', function() {
    console.log('close connection');
  });
});
app.wss = wss;

app.set('port', (process.env.PORT || 3000));
models.sequelize.sync().then(function () {
  server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});
exports =module.exports=app;



