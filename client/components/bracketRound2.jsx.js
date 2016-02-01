"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';


class BracketRound2 extends React.Component {


  render () {

    let bracketSchools = [];
      for (var i = 0; i< 16; i++) {
        bracketSchools.push(<BracketSchool key={"2" + i} name= {"Team" + i} />)
      }
    return (
        <div className={"round-two" + this.props.side}>
          <div className = "border-div">
          </div>
          {bracketSchools}
          {this.props.children}
        </div>
      )
  }
};

export default BracketRound2;

