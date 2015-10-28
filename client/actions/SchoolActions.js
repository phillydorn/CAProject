var Reflux = require('reflux');

var SchoolActions = Reflux.createActions({
  "selectTeam": {'children': ['completed', 'failed']}
});



module.exports = SchoolActions;