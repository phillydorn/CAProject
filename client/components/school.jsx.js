import {React, ReactDOM} from '../importPackage';
import SchoolActions from '../actions/SchoolActions';
import UserTeamActions from '../actions/UserTeamActions';
import schoolStore from '../stores/schoolStore';
import { ItemTypes } from '../constants';
import { DragSource } from 'react-dnd';
let { PropTypes } = React;

let schoolSource = {

  canDrag(props) {
    return props.rankingType == 'custom';
  },

  beginDrag(props) {
    console.log('begindrag', props)
      return {};
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()){
      let {rank} = monitor.getDropResult();
      let {teamId, schoolId } = props;
      let currentRank = props.rank;
    console.log('enddrag', props)
      console.log('diddrop',monitor.getDropResult())
      SchoolActions.rerank(schoolId, currentRank, rank, teamId);

    }
  }
}

let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class School extends React.Component {

  handleSelect(e) {
    e.preventDefault();
    if (this.props.yourTurn) {
      let schoolId = this.props.schoolId;
      let leagueId = this.props.leagueId;
      SchoolActions.selectTeam(schoolId, leagueId);
    }
  }

  render() {

    let connectDragSource = this.props.connectDragSource;
    let isDragging = this.props.isDragging;

    return connectDragSource(
        <li style={{
        cursor: 'move'
      }}
      onClick = {this.handleSelect} className = {"school " + this.props.schoolName}>
          <a href="#">{this.props.rank}.  {this.props.schoolName}</a>
        </li>
      )
  }
};

School.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };


export default DragSource(ItemTypes.SCHOOL, schoolSource, collect)(School);