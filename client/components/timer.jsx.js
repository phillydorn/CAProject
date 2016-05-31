"use strict";

import { React, Reflux } from '../importPackage';


class Timer extends React.Component{

  constructor(props){
    super(props);
    this.state = {time: 60};
  }

  componentDidMount() {
    socket.on('timer', (seconds)=>{
      this.startTimer()
    });
  }

   componentWillUnmount () {
      socket.removeAllListeners('timer');
    }

  startTimer () {
    let self = this;
    let seconds = 60;
    if (this.timer){
      clearInterval(this.timer)
    }
    this.timer = setInterval(()=>{
    console.log('seconds  d', seconds)
    self.setState({time: seconds});
      seconds--;
      if (seconds < 1) {
        clearInterval(self.timer);
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