var teams = require('../helpers/teamFunctions');

module.exports = function(app) {
  app.get('/*', teams.loadSchools);
};