var models = require('../models');

module.exports = {

  loadSchools: function(req, res) {
    var teamId = req.url.slice(1);
    models.Team.findById(teamId).then(function(team) {
      team.getNCAA_Teams({}).then(function(schools){
        res.status(200).send(schools);
      });
    });
  }



}