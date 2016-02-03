"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';
import BracketFinal from './bracketFinal.jsx.js';


class Bracket4 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {nextWinners: []}
  }

  componentWillReceiveProps(nextProps) {
    let nextWinners = nextProps.winners.filter((school)=>{
      return school.round4Win;
    });
    this.setState({nextWinners})
  }

  render () {

   let bracketSchools = this.props.winners.map((school, idx)=>{
      let add = this.props.side === ' right' ? 3 : 1;
        return <BracketSchool id = {"Round4-" +  (idx+add) } key={ "Round4" + idx } winner = {school.round4Win} yourSchools = {this.props.yourSchools } schoolId={school.id} name= {school.market} />;
    });


    return (
        <div className={"round-four" + this.props.side}>
          <div className = "border-div">
          </div>
          {bracketSchools}
          <BracketFinal winners = {this.state.nextWinners } yourSchools= {this.props.yourSchools} side={this.props.side} />
        </div>
      )
  }
};

export default Bracket4;

