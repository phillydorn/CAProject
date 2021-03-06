import { React, Reflux } from '../importPackage';
import BracketRound1 from './bracketRound1.jsx.js';
import BracketRound2 from './bracketRound2.jsx.js';
import Bracket16 from './bracket16.jsx.js';
import Bracket8 from './bracket8.jsx.js';
import Bracket4 from './bracket4.jsx.js';
import BracketFinal from './bracketFinal.jsx.js';
import BracketChamp from './bracketChamp.jsx.js';
import PlayIn from './playin.jsx.js';
import BracketActions from '../actions/BracketActions';
import bracketStore from '../stores/bracketStore';
import userTeamStore from '../stores/userTeamStore';
import UserTeamActions from '../actions/UserTeamActions';

var Bracket = React.createClass({

  mixins: [Reflux.ListenerMixin, Reflux.connect(userTeamStore, "yourTeams")],

  getInitialState () {
    return {currentRound: 0, leagueId: '', yourTeams: [], midwest: [], east: [], south: [], west: [], playInSchools: [], champ: {id: '', market: ''}};
  },


  componentWillMount () {
    this.setState({leagueId: this.props.params.league})
    this.listenTo(bracketStore, this.fillBracket);
    BracketActions.fillBracket();
  },

  componentDidMount() {
    if (this.state.leagueId) {

    UserTeamActions.getTeam(this.state.leagueId);
    }

  },


  fillBracket (schools) {
    let champ = schools.totalSchools.filter((school)=>{
      return school.roundFinalWin;
    })[0];
    this.setState({midwest: schools.midwest, east: schools.east, south: schools.south, west: schools.west, playInSchools: schools.playInSchools, champ: champ})
    // this.setState(Object.assign(schools));
  },

  render: function() {

    return (
        <div className="bracket" >
          <BracketRound1 currentRound = {this.state.currentRound} yourSchools={this.state.yourTeams } top={this.state.midwest} bottom={this.state.west} divisions = {{ top: "Midwest", bottom: "West"}} side="" />
          <BracketChamp currentRound = {this.state.currentRound} yourSchools = {this.state.yourTeams } school = {this.state.champ}/>
          <BracketRound1 currentRound = {this.state.currentRound} yourSchools = {this.state.yourTeams} top={this.state.east} bottom={this.state.south} divisions = {{top: "East", bottom: "South" }} side=" right"/>

          <PlayIn currentRound = {this.state.currentRound} yourSchools={this.state.yourTeams} teams={this.state.playInSchools} />
        </div>
      )
  }
});

module.exports = Bracket;