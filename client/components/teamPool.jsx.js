var React = require('react');
import School from './school.jsx.js';
var SchoolSlot = require('./schoolSlot.jsx.js');



var TeamPool = React.createClass({


  render: function() {
    var schoolNodes = this.props.schoolsList.map(function (school, rank) {
      return (
          <SchoolSlot key={school.id} teamId = {this.props.teamId} >
            <School rank={rank+1} teamId = {this.props.teamId} yourTurn = {this.props.yourTurn} leagueId={this.props.leagueId} schoolName = {school.market} key = {school.id} schoolId = {school.id} />
          </SchoolSlot>
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