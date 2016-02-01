"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';


class Bracket16 extends React.Component {


  render () {

    let bracketSchools = [];
      for (var i = 0; i< 8; i++) {
        bracketSchools.push(<BracketSchool key={ "Round16" + i } name= {"Team" + i} />)
      }
    return (
        <div className={"round-sixteen" + this.props.side}>
          <div className = "border-div">
          </div>
          {bracketSchools}
        </div>
      )
  }
};

export default Bracket16;

