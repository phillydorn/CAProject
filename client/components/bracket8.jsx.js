"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';


class Bracket8 extends React.Component {


  render () {

    let bracketSchools = [];
      for (var i = 0; i< 4; i++) {
        bracketSchools.push(<BracketSchool key={ "Round8" + i } name= {"Team" + i} />)
      }
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
        </div>
      )
  }
};

export default Bracket8;

