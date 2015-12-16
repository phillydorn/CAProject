var React = require('react');
var School = require('./school.jsx.js');

var TeamPool = React.createClass({


  render: function() {
    var schoolNodes = this.props.schoolsList.map(function (school, rank) {
      return (
          <School rank={rank+1} yourTurn = {this.props.yourTurn} leagueId={this.props.leagueId} schoolName = {school.market} key = {school.id} schoolId = {school.id} />
        )
    }.bind(this));
    return (
      <div className = "team-box teamPool">
        <ul className="team-list">
         {schoolNodes}
        </ul>
      </div>
    )
  }
});

module.exports = TeamPool;