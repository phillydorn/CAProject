var express=require('express');
var bodyParser = require('body-parser');


module.exports = function(app) {
  var schoolRouter = express.Router();
  var leagueRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/api/schools', schoolRouter);
  app.use('/api/leagues', leagueRouter);

  require('./routers/schoolRouter.js')(schoolRouter);
  require('./routers/leagueRouter.js')(leagueRouter);
};