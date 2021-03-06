import {React} from '../importPackage';
import SchoolSlot  from './schoolSlot.jsx.js';
var MainActions = require('../actions/MainActions');



class TeamPool extends React.Component {


  constructor(props) {
    super(props);
    this.state = {ranking: 'default'};
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleDefault = this.toggleDefault.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.teamId !== this.props.teamId ||
           nextProps.schoolsList.length !== this.props.schoolsList.length ||
           nextProps.yourTurn !== this.props.yourTurn ||
           !this.checkSchoolsList(nextProps);
  }

  checkSchoolsList (nextProps) {
    console.log('this', this.props.schoolsList, 'next', nextProps.schoolsList)
      let len = this.props.schoolsList.length;
      for (let i = 0; i<len; i++) {
        if (this.props.schoolsList[i].id !== nextProps.schoolsList[i].id) {
          return false;
        }
      }
      return true;
    }

  toggleDefault(e) {
    e.preventDefault();
    this.setState({ranking: 'default'})
    console.log('toggling', this.state.ranking)
    MainActions.populate(this.props.leagueId, null, 'default');
  }

  toggleCustom (e) {
    e.preventDefault();
    this.setState({ranking: 'custom'})
    console.log('toggling', this.state.ranking)
    MainActions.populate(this.props.teamId, null, 'custom');
  }

  render() {
    console.log('render teampool', this.props, 'state', this.state)
    let isDefault = this.state.ranking === 'default' ? 'ranking-on' : '';
    let isCustom = this.state.ranking === 'custom' ? 'ranking-on' : '';


    let schoolNodes = this.props.schoolsList.map((school, rank) => {
      return (
          <SchoolSlot { ...this.props} schoolName = {school.market} schoolId= {school.id} rank={rank+1} rankingType={this.state.ranking} key={school.id} >
          </SchoolSlot>
        )
    });
    return (
      <div>
        <div className="ranking-switch">
          <p>Ranking</p>
          <button className={"ranking-button ranking-default " + isDefault } onClick={this.toggleDefault} >Default </button>
          <button className= {"ranking-button ranking-custom " + isCustom } onClick={this.toggleCustom} >Custom</button>
        </div>
        <div className = "team-box teamPool">
          <ul className="team-list">
           {schoolNodes}
          </ul>
        </div>
      </div>
    )
  }
};

module.exports = TeamPool;