import {React, ReactDOM} from '../importPackage';
import { DropTarget } from 'react-dnd';
import { ItemTypes} from '../constants';
import School from './school.jsx.js';


const slotTarget = {

  canDrop(props) {
    return props.rankingType == 'custom';
  },

  drop (props, monitor) {
    return {rank: props.rank-1}
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),

  };
}

class TopTarget extends React.Component {

  renderBorder() {
    return (
      <div style={{
        'borderTop': '3px solid black'
      }} />
    );
  }


  render () {
    const { connectDropTarget, isOver } = this.props;

    return connectDropTarget(
        <div className="topTarget">
        {isOver && this.renderBorder()}
          <School { ...this.props} />
        </div>
      )
  }
}

export default DropTarget(ItemTypes.SCHOOL, slotTarget, collect)(TopTarget);
