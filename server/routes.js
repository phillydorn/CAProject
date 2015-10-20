var express=require('express');
var bodyParser = require('body-parser');


module.exports = function(app) {
  var schoolRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/api/schools', schoolRouter);

  require('./routers/schoolRouter.js')(schoolRouter);
};