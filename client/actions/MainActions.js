var Reflux = require('reflux');

MainActions = Reflux.createActions({
  "loadSchools": {"children": ["completed", "failed"]}
});

module.exports = MainActions;