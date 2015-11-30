"use strict";

var React = require('react'),
    Reflux = require('reflux');


class Timer extends React.Component{

  render () {
    var activeString = this.props.activeTeam ? this.props.activeTeam+' is drafting.' : "Draft has not begun yet.";
    return (
      <div>
        <p>Round {this.props.round}</p>
        <p>{activeString}</p>
        <p>Time Left {this.props.time}</p>
      </div>
    )
  }
}

module.exports = Timer;