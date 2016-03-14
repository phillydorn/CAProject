"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';
import BlankSchool from './blankSchool.jsx.js';


class BracketChamp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {hasPlayed: false}
  }

  render () {


    return (
        <div className="champion">
          <div className = "border-div">
          </div>
          {this.state.hasPlayed ? <BracketSchool key= "champ" id = "champ" winner = {true} yourSchools = {this.props.yourSchools} schoolId = {this.props.school.id} name = {this.props.school.market} /> : <BlankSchool id = "champ"  key="champ" />}
        </div>
      )
  }
};

export default BracketChamp;

