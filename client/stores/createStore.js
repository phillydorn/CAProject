var Reflux = require('reflux');
var CreateActions = require('../actions/CreateActions');
var $ = require('jquery');

createStore= Reflux.createStore({
  listenables: [CreateActions],

  onCreateLeague: function(data) {
    $.ajax({
      url: '/api/leagues',
      method: 'POST',
      data: data,
      success: function(response) {
        console.log('success', response)
      }
    });
  }

});


module.exports = createStore;