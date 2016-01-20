"use strict";
var models = require('../models');

var drafts = {};

module.exports = {

  startTimer(io, leagueId) {
    let seconds = 60;
    drafts[leagueId].timer = setInterval(()=>{
      seconds--;
      io.to(leagueId).emit('timer', seconds)
      if (seconds < 1) {
        clearInterval(drafts[leagueId].timer);
      }
    }, 1000);
  },

  startDraft (io, leagueId) {
    drafts[leagueId] = {
          timer:60,
          round: 0,
          position: 0,
          drafting: true
        }
    this.startTimer(io, leagueId);
  },

  checkDraftInProgress(leagueId, socket) {
    var leagues = require('./leagueFunctions');
    if (drafts[leagueId] && drafts[leagueId].round<10) {
      let nextDraft = leagues.findNextDraftId(drafts[leagueId].round, drafts[leagueId].position);
      socket.emit('advance', {round: drafts[leagueId].round, position: drafts[leagueId].position, nextUpId:nextDraft.id, nextUpName: nextDraft.team_name});
    }
  },

  advance (leagueId, io) {
    console.log('advance')
    var leagues = require('./leagueFunctions');
    clearInterval(drafts[leagueId].timer);

    io.to(leagueId).emit('update', leagueId);

    if (drafts[leagueId].position<5) {
      drafts[leagueId].position++;
    } else {
      drafts[leagueId].position = 0;
      drafts[leagueId].round++;
    }
    if (drafts[leagueId].round < 10) {
      let nextDraft = leagues.findNextDraftId(drafts[leagueId].round, drafts[leagueId].position);
      console.log('next', nextDraft)

      models.League.findById(leagueId).then((league)=>{
        models.Team.findById(nextDraft.id).then((team)=>{
          if(team.autodraft === true) {
            team.getNCAA_Teams().then((schools)=>{
              var minSchool = schools.filter((school)=>{

                return !school.Team_NCAA.draftedByMe && !school.Team_NCAA.draftedByOther})
              .reduce((prev, curr)=>{
                if (prev.Team_NCAA.playerRanking < curr.Team_NCAA.playerRanking) {
                  return prev;
                } else {
                  return curr;
                }
              }, {Team_NCAA:Infinity});
              console.log('team', team.team_name, 'should draft', minSchool.market);
                leagues.draftTeam(league, team, minSchool.id, null, io);
              });



          } else {
            io.to(leagueId).emit('advance', {round: drafts[leagueId].round, position: drafts[leagueId].position, nextUpId:nextDraft.id, nextUpName: nextDraft.team_name});
            if (drafts[leagueId].round < 10) {
              this.startTimer(io, leagueId);
            }
          }
        });
      });
    }
  },

  getRound(leagueId) {
    return drafts[leagueId].round + 1;
  }

}