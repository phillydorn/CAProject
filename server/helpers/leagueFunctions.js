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
          league[0].setNCAA_Teams(teams);
        })
        .then(function() {
            models.User.find({
              where: {
                id: req.user.id
              }
            }).then (function(user) {
              league[0].setUsers(user);
              console.log('league id', league[0].id)
              res.status(200).json(league[0].id);
            });

        });
      });
    });
  },

  createOwnerTeam: function(req, res) {
    var teamName = req.body.teamname;
    var userID = req.user.id;
    var leagueID = req.url.slice(1);
    console.log('team', teamName, 'user', userID, 'leag', leagueID)

    models.Team.create({team_name:teamName, wins:0}).then (function(team) {
      models.League.findById(leagueID).then(function(league) {
        league.addTeam(team).then (function() {
          models.User.findById(userID).then(function(user) {
            user.addTeam(team).then(function() {
              user.addLeague(league).then (function() {
                res.status(200).send('success');
              });
            });
          });
        });
      });
    });


  },

  getUserLeagues: function(req, res) {
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

  getAllLeagues: function(req, res) {
    models.League.findAll().then (function(leagues) {
      res.status(200).json(leagues);
    });
  },

  loadSchools: function(req, res) {
    var id = req.url.slice(1);
    models.League.findById(id).then (function (league) {
      league.getNCAA_Teams().then (function(NCAATeams) {
        data = {schoolsList: NCAATeams, leagueName:league.name}
        league.getTeams().then(function(teams){
          data.teams = teams;
          models.User.findById(req.user.id).then(function(user) {
            teams.forEach(function(team) {
              if (team.UserId===user.id) {
                data.userTeam = team;
                res.status(200).json(data);
              }
            });
          });
        });

      });
    })
  },
  joinLeague: function(req, res) {
    var leagueId = req.body.id;
    var userId = req.user.id;
    models.League.findById(leagueId).then (function(league) {
      models.User.findById(userId).then (function(user) {
        league.addUser(user);
        res.status(200).json(league);
      });
    });
  },

  selectTeam: function(req, res) {
    var schoolId = req.body.schoolId;
    console.log('url', req.url)
    var leagueId = req.url.slice(1);
    var userId = req.user.id;
    models.NCAA_Team.findById(schoolId).then (function(school) {
      models.League.findById(leagueId).then(function(league) {
        console.log('league', leagueId, 'user', userId)
        models.Team.findOne({
          where: {
            LeagueId: leagueId,
            UserId: userId
          }
        }).then (function(team) {
          team.addNCAA_Team(school).then (function() {
            league.removeNCAA_Team(school).then (function() {
                app.io.clients.forEach(function(client) {
                  client.send('update');
                });
              res.status(200).json(league);
            });
          });
        });
      });
    });
  }
}
