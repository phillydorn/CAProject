var models = require('../models');

module.exports = {
  createLeague : function(data) {

    models.sequelize.sync().then(function() {
      models.League.findOrCreate({
        where: {
          name: data.body.leaguename
        },
        defaults: {
          name: data.body.leaguename
        }
      }).then(function(league) {
        models.User.find({
          where: {
            id:1
          }
        }).then (function(user) {
          league[0].setUsers(user);
        });
      });
    });
  }
}