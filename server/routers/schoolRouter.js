var schools = require('../helpers/schoolFunctions');

module.exports = function(app) {
  app.get('/', schools.fetchAllSchools);
};