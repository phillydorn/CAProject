var Reflux = require('reflux');
var MainActions = require('../actions/MainActions');

mainStore = Reflux.createStore({
  listenables: [MainActions],

  getInitialState: function() {
    return this.onLoadSchools();
  },

  onLoadSchools: function() {
    var schoolsList = [
      {name: 'Northwestern'},
      {name: 'Michigan'},
      {name: 'Ohio State'},
      {name: 'Michigan State'},
      {name: 'Purdue'},
      {name: 'Illinois'},
    ];
    return schoolsList;

  }
});

module.exports = mainStore;