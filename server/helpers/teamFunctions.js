"use strict";

var models = require('../models');

module.exports = {

  loadSchools: function(req, res) {
    var teamId = req.url.slice(1);
    models.Team.findById(teamId).then(function(team) {
      if (team) {
        team.getNCAA_Teams().then(function(schools){
          let draftedSchools = schools.filter((school)=>{
            return school.Team_NCAA.drafted;
          });
          res.status(200).send(draftedSchools);
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
    let {schoolId, rank } = req.body;
    models.Team.findById(teamId).then((team)=>{
      team.getNCAA_Teams().then((NCAATeams)=>{
        console.log(NCAATeams)
      })
    })
  }

}