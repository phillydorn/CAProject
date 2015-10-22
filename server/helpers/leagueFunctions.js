var models = require('../models');

module.exports = {
  createLeague : function(req, res) {

    models.sequelize.sync().then(function() {
      models.League.findOrCreate({
        where: {
          name: req.body.leaguename
        },
        defaults: {
          name: req.body.leaguename
        }
      }).then(function(league) {
        models.User.find({
          where: {
            id: req.user.id
          }
        }).then (function(user) {
          league[0].setUsers(user);
        });
      });
    });
  }
}