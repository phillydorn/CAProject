"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';


class BracketChamp extends React.Component {


  render () {

    let bracketSchools = [];
      for (var i = 0; i< 1; i++) {
        bracketSchools.push(<BracketSchool key={ "Champ" + i } name= {"Team" + i} />)
      }
    return (
        <div className="champion">
          <div className = "border-div">
          </div>
          {bracketSchools}
        </div>
      )
  }
};

export default BracketChamp;

