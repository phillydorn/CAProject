var React = require('react');
var School = require('./school.jsx.js');

var TeamPool = React.createClass({

  render: function() {
    this.props.schoolsList = this.props.schoolsList instanceof Array ? this.props.schoolsList : this.props.schoolsList.list;
    var schoolNodes = this.props.schoolsList.map(function (school) {
      return (
          <School schoolName = {school.market} key = {school.id} schoolId = {school.id} />
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