var React = require('react');

var Bracket = React.createClass({

  getDefaultProps: function() {
    return {teams: []};
  },


  render: function() {
    this.props.teams = this.props.teams instanceof Array ? this.props.teams : this.props.teams.list;
    var schoolnodes = this.props.teams.map(function(team) {

    });
    return (
        <a href="#" className = "bracket"></a>
      )
  }
});

module.exports = Bracket;