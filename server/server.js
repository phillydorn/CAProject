//
var express = require('express');
    app = express(),
    server  = require('http').createServer(app),
    bodyParser = require ('body-parser'),
    WebSocketServer = require('ws').Server;


require('./config/express')(app);
require('./auth')(app);
require('./routes')(app);

var models = require('./models');




app.set('port', (process.env.PORT || 3000));
// models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
// });

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  console.log('ws connection');
  ws.on('message', function (message) {
    console.log('received', message)
  });
  ws.send('outgoing');
  wss.clients.forEach(function(client) {
    ws.send('broadcast')
  })
  ws.on('close', function() {
    console.log('close connection');
  });
});
app.wss = wss;

exports =module.exports=app;



