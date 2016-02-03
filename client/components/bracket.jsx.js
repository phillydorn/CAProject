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
    return {leagueId: '', yourTeams: [], midwest: [], east: [], south: [], west: [], playInSchools: []};
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
    this.setState({midwest: schools.midwest, east: schools.east, south: schools.south, west: schools.west, playInSchools: schools.playInSchools})
    // this.setState(Object.assign(schools));
  },

  render: function() {
    // <Bracket isVisible={false} yourTeams={this.state.yourTeams} teamId={this.state.teamId} teams={this.state.schoolsList} />


          // <BracketFinal side=" right"/>
          // <Bracket4 side=" right"/>
          // <Bracket8 divisionOne="East" divisionTwo= "South" side=" right"/>
          // <Bracket16 side=" right"/>
          // <BracketRound2 side=" right"/>
    return (
        <div className="bracket" >
          <BracketRound1 yourSchools={this.state.yourTeams } top={this.state.midwest} bottom={this.state.west} side="" />
          <BracketChamp />
          <BracketRound1 yourSchools = {this.state.yourTeams} top={this.state.east} bottom={this.state.south} side=" right"/>

          <PlayIn yourSchools={this.state.yourTeams} teams={this.state.playInSchools} />
        </div>
      )
  }
});

module.exports = Bracket;