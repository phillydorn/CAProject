import { React } from '../importPackage';
import BracketSchool from './bracketSchool.jsx.js';


class PlayIn extends React.Component {

  render () {

    let playInBrackets = this.props.teams.map((team, idx)=>{
      return (
          <div key={ "playin" + idx } className="playInBracket">
            <h3 className="playInDivision">{team.bracket}</h3>
            <div className="playInSchools">
              <BracketSchool yourSchools={this.props.yourSchools} schoolId = {team.schools[0].id} name= {team.schools[0].market} />
              <BracketSchool yourSchools={this.props.yourSchools} schoolId = {team.schools[1].id} name= {team.schools[1].market} />
            </div>
          </div>
        )
    });

    return (
      <div className = "playin">
        <h2>Round One</h2>
        {playInBrackets}
      </div>
    )
  }

}

export default PlayIn;