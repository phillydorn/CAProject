"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';
import Bracket4 from './bracket4.jsx.js';
import BlankSchool from './blankSchool.jsx.js';


class Bracket8 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {nextWinners: [], hasPlayed: false}
  }

  componentWillReceiveProps(nextProps) {
    let nextWinners = nextProps.winners.filter((school)=>{
      return school.round8Win;
    });
    this.setState({nextWinners})
  }

  render () {

    let bracketSchools;
    if (this.props.winners.length) {
      bracketSchools = this.props.winners.map((school, idx)=>{
        let add = this.props.side === ' right' ? 5 : 1;
        return <BracketSchool id = {"Round8-" +  (idx+add) } key={ "Round8" + idx } winner = {school.round8Win} yourSchools = {this.props.yourSchools } schoolId={school.id} name= {school.market} />;
      });
    } else {
      bracketSchools = [];
      for (let i = 0; i<4; i++) {
        let add = this.props.side === ' right' ? 5 : 1;
        bracketSchools.push(<BlankSchool id = {"Round8-" +  (i+add) } key={ "Round8" + i } />);

      }
    }



    return (
        <div className={"round-eight" + this.props.side}>
          <div className = "border-div">
          </div>
          {bracketSchools}
          <div className="division division-one">
            <h3>{this.props.divisions.top}</h3>
          </div>
          <div className="division division-two">
            <h3>{this.props.divisions.bottom}</h3>
          </div>
           <Bracket4 currentRound = {this.props.currentRound} winners = {this.state.nextWinners} yourSchools = {this.props.yourSchools} side={this.props.side} />
        </div>
      )
  }
};

export default Bracket8;

