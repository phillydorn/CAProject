"use strict";

import { React, ReactDOM } from '../importPackage';


class BracketSchool extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isYourSchool1: false, isYourSchool2: false}
  }


  isYourSchool(schoolId1, schoolId2, yourSchools) {
    yourSchools.forEach((yourSchool) =>{
      if (schoolId1 === yourSchool.id) {
        this.setState({isYourSchool1: true});
      }
      if (schoolId2 === yourSchool.id) {
        this.setState({isYourSchool2: true});
      }
    })
  }


  componentWillReceiveProps(nextProps) {
    this.isYourSchool(this.props.schoolId, this.props.school2Id, nextProps.yourSchools)
  }

  render () {
    let seed = this.props.seed ? this.props.seed + '. ' : '';
    let yourSchool1 = this.state.isYourSchool1 ? ' yourSchool' : '';
    let yourSchool2 = this.state.isYourSchool2 ? ' yourSchool' : '';
    return (
      <section className="bracketSchool-container" style={{position: 'relative'}}>
        <div className = "border-div">
        </div>
        <p className={"bracketSchool"}>{seed}<span className={yourSchool1}>{this.props.name1}</span>/<span className={yourSchool2}>{this.props.name2}</span></p>
      </section>
      )
  }
};

BracketSchool.defaultProps = {seed: '', yourSchools: []};

export default BracketSchool;

