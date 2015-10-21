//
var express = require('express');
    app = express(),
    server  = require('http').createServer(app),
    bodyParser = require ('body-parser');


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



exports =module.exports=app;



