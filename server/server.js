//
var express = require('express');
    app = express(),
    server  = require('http').createServer(app),
    bodyParser = require ('body-parser');


require('./config/express')(app);
require('./auth')(app);
require('./routes')(app);



app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() { console.log('Node app running on port', app.get('port')) });



exports =module.exports=app;



