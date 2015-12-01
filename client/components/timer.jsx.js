"use strict";

var React = require('react'),
    Reflux = require('reflux');


var Timer = React.createClass ({

  render () {
    var activeString = this.props.activeTeamName ? this.props.activeTeamName+' is drafting.' : "Draft has not begun yet.";
    return (
      <div>
        <p>Round {this.props.round}</p>
        <p>{activeString}</p>
        <p>Time Left {this.props.time}</p>
      </div>
    )
  }
});

module.exports = Timer;