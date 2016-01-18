"use strict";

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
    if (drafts[leagueId]) {
      let nextDraft = leagues.findNextDraftId(drafts[leagueId].round, drafts[leagueId].position);
      socket.emit('advance', {round: drafts[leagueId].round, position: drafts[leagueId].position, nextUpId:nextDraft.id, nextUpName: nextDraft.team_name});
    }
  },

  advance (leagueId, io) {
    var leagues = require('./leagueFunctions');
    clearInterval(drafts[leagueId].timer);

    io.to(leagueId).emit('update', leagueId);

    if (drafts[leagueId].position<5) {
      drafts[leagueId].position++;
    } else {
      drafts[leagueId].position = 0;
      drafts[leagueId].round++;
    }
    let nextDraft = leagues.findNextDraftId(drafts[leagueId].round, drafts[leagueId].position);
    io.to(leagueId).emit('advance', {round: drafts[leagueId].round, position: drafts[leagueId].position, nextUpId:nextDraft.id, nextUpName: nextDraft.team_name});
    if (drafts[leagueId].round < 10) {
      this.startTimer(io, leagueId);
    }
  },

  getRound(leagueId) {
    return drafts[leagueId].round + 1;
  }

}