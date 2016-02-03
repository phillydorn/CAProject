"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';


class BracketFinal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {nextWinners: []}
  }

  componentWillReceiveProps(nextProps) {
    let winners = nextProps.winners.filter((school)=>{
      return school.roundFinalWin;
    });
    this.setState({nextWinners: winners})
  }

  render () {

    let bracketSchools = this.props.winners.map((school, idx)=>{
      let add = this.props.side === ' right' ? 2 : 1;
        return <BracketSchool id = {"RoundFinal-" +  (idx+add) } key={ "RoundFinal" + idx } winner = {school.roundFinalWin} yourSchools = {this.props.yourSchools } schoolId={school.id} name= {school.market} />;
    });

    return (
        <div className={"round-final" + this.props.side }>
          <div className = "border-div">
          </div>
          {bracketSchools}
        </div>
      )
  }
};

export default BracketFinal;

