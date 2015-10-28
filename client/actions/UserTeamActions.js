var Reflux = require('reflux');

var UserTeamActions = Reflux.createActions([
  "loadSchools"
]);

UserTeamActions.sync = true;
module.exports = UserTeamActions;