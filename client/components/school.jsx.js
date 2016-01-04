var React = require('react');
var SchoolActions = require('../actions/SchoolActions');
var UserTeamActions = require('../actions/UserTeamActions');
var schoolStore = require('../stores/schoolStore');
var PropTypes = React.PropTypes;
var ItemTypes = require('../constants').ItemTypes;
import { DragSource } from 'react-dnd';

var schoolSource = {
  beginDrag: function(props) {
      return {};
  },
  endDrag: function(props, monitor) {
    if (monitor.didDrop()){
      console.log(monitor.getDropResult())
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

var School = React.createClass({

  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  handleSelect: function(e) {
    e.preventDefault();
    if (this.props.yourTurn) {
      var schoolId = this.props.schoolId;
      var leagueId = this.props.leagueId;
      SchoolActions.selectTeam(schoolId, leagueId);
    }
  },
  render: function() {

    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
        <li style={{
        cursor: 'move'
      }}
      onClick = {this.handleSelect} className = {"school " + this.props.schoolName}>
          <a href="#">{this.props.rank}.  {this.props.schoolName}</a>
        </li>
      )
  }
});

module.exports = DragSource(ItemTypes.SCHOOL, schoolSource, collect)(School);