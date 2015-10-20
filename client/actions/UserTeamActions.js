var Reflux = require('reflux');

var UserTeamActions = Reflux.createActions([
  "addSchool"
]);

UserTeamActions.sync = true;
module.exports = UserTeamActions;