import { React, Reflux } from '../importPackage';
import BracketRound1 from './BracketRound1.jsx.js';
import BracketRound2 from './BracketRound2.jsx.js';
import Bracket16 from './Bracket16.jsx.js';
import Bracket8 from './Bracket8.jsx.js';
import Bracket4 from './Bracket4.jsx.js';
import BracketFinal from './BracketFinal.jsx.js';
import BracketChamp from './BracketChamp.jsx.js';
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

    return (
        <div className="bracket" >
          <BracketRound1 yourSchools={this.state.yourTeams } top={this.state.midwest} bottom={this.state.west} side="">
            <BracketRound2 side="">
              <Bracket16 side="">
                <Bracket8 divisionOne="Midwest" divisionTwo="West" side="">
                  <Bracket4 side="">
                    <BracketFinal side="" />
                  </Bracket4>
                </Bracket8>
              </Bracket16>
            </BracketRound2>
          </BracketRound1>
          <BracketChamp />
          <BracketFinal side=" right"/>
          <Bracket4 side=" right"/>
          <Bracket8 divisionOne="East" divisionTwo= "South" side=" right"/>
          <Bracket16 side=" right"/>
          <BracketRound2 side=" right"/>
          <BracketRound1 yourSchools = {this.state.yourTeams} top={this.state.east} bottom={this.state.south} side=" right"/>
          <PlayIn yourSchools={this.state.yourTeams} teams={this.state.playInSchools} />
        </div>
      )
  }
});

module.exports = Bracket;