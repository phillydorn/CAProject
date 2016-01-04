var React = require('react');
var LeagueActions = require('../actions/LeagueActions');

var League = React.createClass({


  render: function() {
    return (
        <li  className = {"league " + this.props.leagueName}>
          <a href={"/#/leagues/" +  this.props.leagueId}>{this.props.leagueName}</a>
        </li>
      )
  }
});

module.exports = League;