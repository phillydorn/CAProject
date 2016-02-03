"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';


class BracketChamp extends React.Component {


  render () {


    return (
        <div className="champion">
          <div className = "border-div">
          </div>
          <BracketSchool key= "champ" id = "champ" yourSchools = {this.props.yourSchools} schoolId = {this.props.school.id} name = {this.props.school.market} />
        </div>
      )
  }
};

export default BracketChamp;

