"use strict";

var models = require('../models');

module.exports = {

  loadSchools: function(req, res) {
    var teamId = req.url.slice(1);
    models.Team.findById(teamId).then(function(team) {
      if (team) {
        team.getNCAA_Teams({}).then(function(schools){
          res.status(200).send(schools);
        });
      } else {
        res.status(200).send([]);
      }
    }).catch(function(err) {
        res.status(200).send([]);
      });
  },

  rerank(req, res){
    let teamId = req.url.slice(1);
    let rank = req.body.rank;
    models.Team.findById(teamId).then((team)=>{
      team.getNCAA_Teams().then((NCAATeams)=>{
        console.log(NCAATeams)
      })
    })
  }

}