
module.exports = function(app, io) {
  var leagues = require('../helpers/leagueFunctions')(io);
  app.post('/', leagues.createLeague);
  app.post('/*', leagues.createOwnerTeam);
  app.get('/user', leagues.getUserLeagues);
  app.get('/', leagues.getAllLeagues);
  app.get('/*', leagues.loadSchools);
  app.put('/', leagues.joinLeague);
  app.put('/*', leagues.selectTeam);
};