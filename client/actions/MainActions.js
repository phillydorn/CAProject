var Reflux = require('reflux');

var MainActions = Reflux.createActions([
  {"loadSchools": {"children": ["completed", "failed"]}},
  {"selectTeam" : {"children": ["completed", "failed"]}}
]);



module.exports = MainActions;