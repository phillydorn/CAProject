"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';


class Bracket4 extends React.Component {


  render () {

    let bracketSchools = [];
      for (var i = 0; i< 2; i++) {
        bracketSchools.push(<BracketSchool key = {'t4' + i} name= {"Team" + i} />)
      }
    return (
        <div className={"round-four" + this.props.side}>
          <div className = "border-div">
          </div>
          {bracketSchools}
        </div>
      )
  }
};

export default Bracket4;

