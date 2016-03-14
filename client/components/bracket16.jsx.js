"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';
import Bracket8 from './bracket8.jsx.js';
import BlankSchool from './blankSchool.jsx.js';


class Bracket16 extends React.Component {

 constructor(props) {
    super(props)
    this.state = {nextWinners: [], hasPlayed: false}
  }

  componentWillReceiveProps(nextProps) {
    let nextWinners = nextProps.winners.filter((school)=>{
      return school.round16Win;
    });
    this.setState({nextWinners})
  }


  render () {

    let bracketSchools;
    if (this.props.winners.length) {
      bracketSchools = this.props.winners.map((school, idx)=>{
        let add = this.props.side === ' right' ? 9 : 1;
        return <BracketSchool id = {"Round16-" +  (idx+add) } key={ "Round16" + idx } winner = {school.round16Win} yourSchools = {this.props.yourSchools } schoolId={school.id} name= {school.market} />;
      });
    } else {
      bracketSchools = [];
      for (let i = 0; i<8; i++) {
        let add = this.props.side === ' right' ? 9 : 1;
        bracketSchools.push(<BlankSchool id = {"Round16-" +  (i+add) } key={ "Round16" + i } />);

      }
    }


    return (
        <div className={"round-sixteen" + this.props.side}>
          <div className = "border-div">
          </div>
          {bracketSchools}
          <Bracket8 currentRound = {this.props.currentRound} winners = {this.state.nextWinners} yourSchools = {this.props.yourSchools} divisions = {this.props.divisions}  side={this.props.side} />
        </div>
      )
  }
};

export default Bracket16;

