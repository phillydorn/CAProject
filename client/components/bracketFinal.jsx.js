"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';


class BracketFinal extends React.Component {


  render () {

    let bracketSchools = [];
      for (var i = 0; i< 1; i++) {
        bracketSchools.push(<BracketSchool key={ "RoundFinal" + i } name= {"Team" + i} />)
      }
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

