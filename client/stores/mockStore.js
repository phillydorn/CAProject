import { Reflux } from '../importPackage';
import MockActions from '../actions/MockActions';
var $ = require('jquery');

var mockStore = Reflux.createStore({

  listenables: [MockActions],

  onCreateTeams (leagueId) {
    let self = this;
    $.ajax({
      url: 'api/mocks/teams',
      dataType: 'json',
      method: 'POST',
      data: {leagueId},
      success (data) {
        console.log('success')
        self.trigger({teams: true})
      }
    })  ;
  }


});

export default mockStore;