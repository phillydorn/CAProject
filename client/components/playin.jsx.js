import { React } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';


class PlayIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hasPlayed: false}
  }

  render () {


    let playInBrackets = this.props.teams.map((team, idx)=>{
      let winLoss0 = this.state.hasPlayed ? team.schools[0].playInWin : 'notPlayed';
      let winLoss1 = this.state.hasPlayed ? team.schools[1].playInWin : 'notPlayed';
      return (
          <div key={ "playin" + idx } className={"playInBracket bracket-" + idx}>
            <h3 className="playInDivision">{team.bracket}</h3>
            <div className="playInSchools">
              <BracketSchool yourSchools={this.props.yourSchools} winner = {winLoss0} schoolId = {team.schools[0].id} name= {team.schools[0].market} />
              <BracketSchool yourSchools={this.props.yourSchools} winner = {winLoss1} schoolId = {team.schools[1].id} name= {team.schools[1].market} />
            </div>
          </div>
        )
    });

    return (
      <div className = "playin">
        <h2>Round One</h2>
        <div className = "bracket-container">
          {playInBrackets}
        </div>
      </div>
    )
  }

}

export default PlayIn;