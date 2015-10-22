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
        models.NCAA_Team.findAll().then(function(teams) {
          console.log('teams', teams[0])
          league[0].setNCAA_Teams(teams);
        })
        .then(function() {
            models.User.find({
              where: {
                id: req.user.id
              }
            }).then (function(user) {
              league[0].setUsers(user);
            });

        });
      });
    });
  },

  getLeagues: function(req, res) {
    models.League.findAll({
      include: [{
        model: models.User,
        where: {
          id: req.user.id
        }
      }]
    }).then (function(leagues) {
      res.status(200).json(leagues);
    });
  },

  loadSchools: function(req, res) {
    var id = req.url.slice(1);
    console.log('your id is ', id)
    models.League.findById(id).then (function (league) {
      league.getNCAA_Teams().then (function(teams) {
        res.status(200).json(teams);
      });
    })
  }
}
