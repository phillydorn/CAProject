var React = require('react');
var LeagueActions = require('../actions/leagueActions');

var League = React.createClass({

  // handleSelect: function(e) {
  //   e.preventDefault();
  //   LeagueActions.selectLeague(this.props.leagueId);
  // },
  render: function() {
    return (
        <li  className = {"league " + this.props.leagueName}>
          <a href={"/#/leagues/" +  this.props.leagueId}>{this.props.leagueName}</a>
        </li>
      )
  }
});

module.exports = League;