var leagues = require('../helpers/leagueFunctions');

module.exports = function(app) {
  app.post('/', leagues.createLeague);
  app.get('/', leagues.getLeagues);
  app.get('/*', leagues.loadSchools);
};