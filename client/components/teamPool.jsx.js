var React = require('react');
var School = require('./school.jsx.js');

var TeamPool = React.createClass({
  render: function() {
    console.log('nodes', this.props.schoolsList)
    var schoolNodes = this.props.schoolsList.map(function (school) {
      return (
          <School schoolName = {school.name} />
        )
    });
    return (
      <div className = "teamPool">
        <ul id="team-list">
         {schoolNodes}
        </ul>
      </div>
    )
  }
});

module.exports = TeamPool;