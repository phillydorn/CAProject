import { React } from '../importPackage';
import MockActions from '../actions/MockActions';
import mockStore from '../stores/mockStore';
import listenerMixin from './listenerMixin.jsx';


@listenerMixin
class CreateTeams extends React.Component {

  componentDidMount() {
    this.props.listenTo(mockStore, this.updatePage.bind(this));
  }

  updatePage () {
    socket.emit('leaguePage', this.props.leagueId);
  }


  clickHandler(e) {
    MockActions.createTeams(this.props.leagueId);
  }


  render () {
    return (
        <button onClick = {this.clickHandler.bind(this)} >Create Teams</button>
      )
  }

}

export default CreateTeams;