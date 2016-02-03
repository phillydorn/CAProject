"use strict";

import { React, ReactDOM } from '../importPackage';


class BracketSchool extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isYourSchool: false}
  }


  isYourSchool(schoolId, yourSchools) {
    yourSchools.forEach((yourSchool) =>{
      if (schoolId === yourSchool.id) {
        this.setState({isYourSchool: true});
      }
    })
  }


  componentWillReceiveProps(nextProps) {
    this.isYourSchool(this.props.schoolId, nextProps.yourSchools)
  }

  render () {
    let winner = this.props.winner ? ' winner' : ' loser';
    let seed = this.props.seed ? this.props.seed + '. ' : '';
    let yourSchool = this.state.isYourSchool ? ' yourSchool' : '';
    return (
      <section className="bracketSchool-container" style={{position: 'relative'}}>
        <div className = "border-div">
        </div>
        <p className={"bracketSchool" + yourSchool + winner }>{seed}{this.props.name}</p>
      </section>
      )
  }
};

BracketSchool.defaultProps = {seed: '', yourSchools: []};

export default BracketSchool;

