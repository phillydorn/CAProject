var React = require('react');
var School = require('./school.jsx.js');

var TeamPool = React.createClass({

  render: function() {
    var schoolNodes = this.props.schoolsList.map(function (school) {
      return (
          <School schoolName = {school.name} key = {school.id} schoolId = {school.id} />
        )
    });
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