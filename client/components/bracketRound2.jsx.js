"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';
import BracketActions from '../actions/BracketActions';
import Bracket16 from './bracket16.jsx.js';



class BracketRound2 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {nextWinners: []}
  }

  componentWillReceiveProps(nextProps) {
    let nextWinners = nextProps.winners.filter((school)=>{
      return school.round2Win;
    });
    this.setState({nextWinners})
  }

  render () {


    let bracketSchools = this.props.winners.map((school, idx)=>{
      let add = this.props.side === ' right' ? 17 : 1;
        return <BracketSchool id = {"Round2-" +  (idx+add) } key={ "Round2" + idx } winner = {school.round2Win} yourSchools = {this.props.yourSchools } schoolId={school.id} name= {school.market} />;
    });


    return (
        <div className={"round-two" + this.props.side}>
          <div className = "border-div">
          </div>
          {bracketSchools}
            <Bracket16 winners = {this.state.nextWinners } yourSchools = {this.props.yourSchools} side={this.props.side} />

        </div>
      )
  }
};

export default BracketRound2;

