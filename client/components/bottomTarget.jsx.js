import {React, ReactDOM} from '../importPackage';
import { DropTarget } from 'react-dnd';
import { ItemTypes} from '../constants';
import School from './school.jsx.js';

const slotTarget = {

  canDrop(props) {
    return props.rankingType == 'custom';
  },

  drop (props, monitor, dropComponent) {
    console.log('dropComponent is ', dropComponent)
    return {rank: props.rank, dropComponent, position: 'bottom'}
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),

  };
}

class BottomTarget extends React.Component {

   renderBorder() {
    return (
      <div style={{
        'borderBottom': '3px solid black'
      }} />
    );
  }

  render () {

    const { connectDropTarget, isOver } = this.props;

    return (
        <div className="bottomTarget">
          <School { ...this.props} />
          {isOver && this.renderBorder()}

        </div>
      )
  }
}

export default DropTarget(ItemTypes.SCHOOL, slotTarget, collect)(BottomTarget);

