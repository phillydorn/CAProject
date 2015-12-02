var Reflux = require('reflux');
var $ = require('jquery');



var LeagueActions = Reflux.createActions([
  "loadUserLeagues",
  "loadAllLeagues"
  ]);


module.exports = LeagueActions;