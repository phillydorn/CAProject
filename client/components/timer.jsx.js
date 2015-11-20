"use strict";

var React = require('react'),
    Reflux = require('reflux');


class Timer extends React.Component{

  render () {
    return (
      <div>
        <p>Round {this.props.round}</p>
        <p>Time Left {this.props.time}</p>
      </div>
    )
  }
}

module.exports = Timer;