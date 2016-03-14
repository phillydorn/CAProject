"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';
import BracketActions from '../actions/BracketActions';
import Bracket16 from './bracket16.jsx.js';
import BlankSchool from './blankSchool.jsx.js';



class BracketRound2 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {nextWinners: [], hasPlayed: false}
  }

  componentWillReceiveProps(nextProps) {
    let nextWinners = nextProps.winners.filter((school)=>{
      return school.round2Win;
    });
    this.setState({nextWinners})
  }

  render () {
    let bracketSchools;
    if (this.props.winners.length) {
      bracketSchools = this.props.winners.map((school, idx)=>{
        let add = this.props.side === ' right' ? 17 : 1;
          return <BracketSchool id = {"Round2-" +  (idx+add) } key={ "Round2" + idx } winner = {school.round2Win} yourSchools = {this.props.yourSchools } schoolId={school.id} name= {school.market} />;
      });
    } else {
      bracketSchools = [];
      for (let i = 0; i<16; i++) {
        let add = this.props.side === ' right' ? 17 : 1;
        bracketSchools.push(<BlankSchool id = {"Round2-" +  (i+add) } key={ "Round2" + i } />);

      }
    }


    return (
        <div className={"round-two" + this.props.side}>
          <div className = "border-div">
          </div>
          {bracketSchools}
            <Bracket16 currentRound = {this.props.currentRound} winners = {this.state.nextWinners } yourSchools = {this.props.yourSchools} divisions = {this.props.divisions} side={this.props.side} />

        </div>
      )
  }
};

export default BracketRound2;

