var Reflux = require('reflux');
var $ = require('jquery');



LeagueActions = Reflux.createActions([
  "loadUserLeagues",
  "loadAllLeagues",
  "selectLeague"
  ]);


module.exports = LeagueActions;