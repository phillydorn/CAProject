"use strict";

import { React, Reflux } from '../importPackage';


class Timer extends React.Component{

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
}

module.exports = Timer;