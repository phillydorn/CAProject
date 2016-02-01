"use strict";

var models = require('../models');

module.exports = {

  loadPool (req, res) {
    let teamId = req.url.split('/')[2];
    models.Team.findById(teamId).then((team)=>{
      team.getNCAA_Teams().then((schools)=>{
        schools = schools.sort((a,b)=>{
          return a.Team_NCAA.playerRanking - b.Team_NCAA.playerRanking;
        }).filter((school)=>{
          return !school.Team_NCAA.draftedByMe && !school.Team_NCAA.draftedByOther;
        });

        res.status(200).json({schoolsList: schools});
      });
    });
  },

  loadSchools: function(req, res) {
    var teamId = req.url.slice(1);
    models.Team.findById(teamId).then(function(team) {
      if (team) {
        team.getNCAA_Teams().then(function(schools){
          let draftedSchools = schools.filter((school)=>{
            return school.Team_NCAA.draftedByMe;
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
    let {schoolId, currentRank, newRank } = req.body;
    currentRank = +currentRank;
    newRank = +newRank;
    let totalTeams = 0;
    console.log('current', currentRank, 'newrank', newRank)

    models.Team.findById(teamId).then((team)=>{
      team.getNCAA_Teams().then((NCAATeams)=>{
        NCAATeams.forEach((NCAATeam) => {
          let {playerRanking} = NCAATeam.Team_NCAA;
          let { market } = NCAATeam;


          if (newRank < currentRank) {
            if (NCAATeam.id == schoolId) {
              NCAATeam.Team_NCAA.playerRanking = newRank+1;
            } else if (playerRanking >newRank && playerRanking < currentRank) {
              NCAATeam.Team_NCAA.playerRanking++;
            };
          } else {
            if (NCAATeam.id == schoolId) {
              NCAATeam.Team_NCAA.playerRanking = newRank;
            } else if (playerRanking > currentRank && playerRanking <= newRank) {
              NCAATeam.Team_NCAA.playerRanking --;
            }
          }
          NCAATeam.Team_NCAA.save();
          // NCAATeam.save();
          totalTeams ++;
          if (totalTeams >= NCAATeams.length) {
            res.sendStatus(200);
          }
        })
      })
    })
  },

  turnOffAutoDraft(teamId) {
    console.log('turning off', teamId)
    models.Team.findById(teamId).then((team) =>{
      team.autodraft=false;
      team.save();
    });
  },

  turnOnAutoDraft(teamId) {
    console.log('turnign on', teamId)
    models.Team.findById(teamId).then((team) =>{
      team.autodraft=true;
      team.save();
    });
  },

  getTeamId(req, res) {
    let leagueId = req.url.split('/')[2];

    models.Team.findAll({
      where: {
        LeagueId: leagueId,
        UserId: req.user.id
      }
    }).then ((teams)=>{
        res.status(200).json(teams[0].id);
      });
  }

}