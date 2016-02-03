"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';
import Bracket8 from './bracket8.jsx.js';


class Bracket16 extends React.Component {

 constructor(props) {
    super(props)
    this.state = {nextWinners: []}
  }

  componentWillReceiveProps(nextProps) {
    let nextWinners = nextProps.winners.filter((school)=>{
      return school.round16Win;
    });
    this.setState({nextWinners})
  }


  render () {

  let bracketSchools = this.props.winners.map((school, idx)=>{
    let add = this.props.side === ' right' ? 9 : 1;
    return <BracketSchool id = {"Round16-" +  (idx+add) } key={ "Round16" + idx } winner = {school.round16Win} yourSchools = {this.props.yourSchools } schoolId={school.id} name= {school.market} />;
  });

    return (
        <div className={"round-sixteen" + this.props.side}>
          <div className = "border-div">
          </div>
          {bracketSchools}
          <Bracket8 winners = {this.state.nextWinners} divisionOne="Midwest" divisionTwo="West" side={this.props.side} />
        </div>
      )
  }
};

export default Bracket16;

