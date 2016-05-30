"use strict";

import { React, Reflux } from '../importPackage';


class Timer extends React.Component{

  constructor(props){
    super(props);
    this.state = {time: 60};
  }

  componentDidMount() {
    socket.on('timer', ()=>{
      this.startTimer.bind(this)
    });
  }

  startTimer () {
    let self = this;
    let seconds = 60;
    let timer = setInterval(()=>{
    self.setState({time: seconds});
    console.log('seconds  d', seconds)
      seconds--;
      if (seconds < 1) {
        clearInterval(timer);
      }
    }, 1000);
  }

  render () {
    var activeString = this.props.activeTeamName ? this.props.activeTeamName+' is drafting.' : "Draft has not begun yet.";
    return (
      <div>
        <p>Round {this.props.round}</p>
        <p>{activeString}</p>
        <p>Time Left: {this.state.time} seconds</p>
      </div>
    )
  }
}

module.exports = Timer;