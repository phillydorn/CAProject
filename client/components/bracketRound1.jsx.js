"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';
import BracketSchool2 from './bracketSchool2.jsx.js';


class BracketRound1 extends React.Component {

  constructor(props) {
    super(props)
  }

  render () {
    console.log('round1props', this.props)
    let bracketSchools = this.props.top.concat(this.props.bottom).map((school, idx)=>{

      if (school instanceof Array) {
        return <BracketSchool2 key={ "Round1" + idx } yourSchools = {this.props.yourSchools} schoolId={school[0].id} school2Id={school[1].id} seed={school[0].seed} name1 = {school[0].market} name2= {school[1].market} />;
      } else {
        return <BracketSchool key={ "Round1" + idx } yourSchools = {this.props.yourSchools } seed={school.seed} schoolId={school.id} name= {school.market} />;
      }
    });

    return (
        <div className={"round-one" + this.props.side} >
            {bracketSchools}
            {this.props.children}
        </div>
      )
  }
};



export default BracketRound1;

