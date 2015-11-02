//
var express = require('express');
    app = express(),
    server  = require('http').createServer(app),
    bodyParser = require ('body-parser'),
    io = require('socket.io')(server);


require('./config/express')(app);
require('./auth')(app);
require('./routes')(app);

var models = require('./models');




app.set('port', (process.env.PORT || 3000));
models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});

io.on('connection', function(socket) {
  console.log('socket connection');
  socket.on('message', function (message) {
    console.log('received', message)
  });
  socket.on('close', function() {
    console.log('close connection');
  });
});
app.io = io;

exports =module.exports=app;



