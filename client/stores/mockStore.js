import { Reflux } from '../importPackage';
import MockActions from '../actions/MockActions';
var $ = require('jquery');

var mockStore = Reflux.createStore({

  listenables: [MockActions],

  onCreateTeams (leagueId) {
    $.ajax({
      url: 'api/mocks/teams',
      dataType: 'json',
      method: 'POST',
      data: {leagueId},
      success (data) {
        console.log('success')
        this.trigger({teams: true})
      }
    });
  }


});

export default mockStore;