"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';
import Bracket4 from './bracket4.jsx.js';


class Bracket8 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {nextWinners: []}
  }

  componentWillReceiveProps(nextProps) {
    let nextWinners = nextProps.winners.filter((school)=>{
      return school.round8Win;
    });
    this.setState({nextWinners})
  }

  render () {

  let bracketSchools = this.props.winners.map((school, idx)=>{
    let add = this.props.side === ' right' ? 5 : 1;
    return <BracketSchool id = {"Round8-" +  (idx+add) } key={ "Round8" + idx } winner = {school.round8Win} yourSchools = {this.props.yourSchools } schoolId={school.id} name= {school.market} />;
  });


    return (
        <div className={"round-eight" + this.props.side}>
          <div className = "border-div">
          </div>
          {bracketSchools}
          <div className="division division-one">
            <h3>{this.props.divisionOne}</h3>
          </div>
          <div className="division division-two">
            <h3>{this.props.divisionTwo}</h3>
          </div>
           <Bracket4 winners = {this.state.nextWinners} yourSchools = {this.props.yourSchools} side={this.props.side} />
        </div>
      )
  }
};

export default Bracket8;

