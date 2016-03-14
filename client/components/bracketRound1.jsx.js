"use strict";

import { React, ReactDOM } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';
import BracketSchool2 from './bracketSchool2.jsx.js';
import BracketRound2 from './bracketRound2.jsx.js';


class BracketRound1 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {nextWinners: [], hasPlayed: false}
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    let winners = nextProps.top.concat(nextProps.bottom).filter((school, idx)=>{
      if (school instanceof Array) {
       return school[0].round1Win || school[1].round1Win;
      } else {
        return school.round1Win;
      }
    });

    winners = winners.map((winner)=> {
      if (winner instanceof Array) {
        if (winner[0].round1Win) {
          return winner[0];
        } else {
          return winner[1];
        }
      } else {
        return winner;
      }
    });
    this.setState({nextWinners: winners})
  }

  render () {
    let bracketSchools = this.props.top.concat(this.props.bottom).map((school, idx)=>{
      let add = this.props.side === ' right' ? 33 : 1;
      if (school instanceof Array) {
        return <BracketSchool2 id = {"Round1-" +  (idx+add) }key={ "Round1" + idx } winner = {this.state.hasPlayed ? school.round1Win : 'notPlayed'} yourSchools = {this.props.yourSchools} schoolId={school[0].id} school2Id={school[1].id} seed={school[0].seed} name1 = {school[0].market} name2= {school[1].market} />;
      } else {
        return <BracketSchool id = {"Round1-" +  (idx+add) } key={ "Round1" + idx } winner = {this.state.hasPlayed ? school.round1Win : 'notPlayed'} yourSchools = {this.props.yourSchools } seed={school.seed} schoolId={school.id} name= {school.market} />;
      }
    });



    return (
        <div className={"round-one" + this.props.side} >
            {bracketSchools}
            <BracketRound2 currentRound = {this.props.currentRound} winners = {this.state.nextWinners} yourSchools={this.props.yourSchools} divisions = {this.props.divisions} side={this.props.side} />
        </div>
      )
  }
};



export default BracketRound1;

