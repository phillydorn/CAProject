import { React } from '../importPackage';

var LeagueActions = require('../actions/LeagueActions');

var League = React.createClass({


  render: function() {
    return (
        <li  className = {"league " + this.props.leagueName}>
          <a href={"/#/league/" + this.props.leagueId}>{this.props.leagueName}</a>
        </li>
      )
  }
});

module.exports = League;