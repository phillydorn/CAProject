var Reflux = require('reflux');

var SchoolActions = Reflux.createActions({
  "selectTeam": {'children': ['completed', 'failed']},
  "rerank": {}
});



module.exports = SchoolActions;