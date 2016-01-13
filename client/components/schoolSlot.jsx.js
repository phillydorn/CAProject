import {React, ReactDOM} from '../importPackage';
import { DropTarget } from 'react-dnd';
import { ItemTypes} from '../constants';
import SchoolActions from '../actions/SchoolActions';

const slotTarget = {

  canDrop(props) {
    return props.rankingType == 'custom';
  },

  drop (props, monitor) {
    console.log(props)
    return {rank: props.children.props.rank}
  }
};


function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),

  };
}

class SchoolSlot extends React.Component {
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
      <div style = {{position: 'relative'}}>
        {this.props.children}
        {isOver && this.renderBorder()}
      </div>
    )
  }

}

module.exports = DropTarget(ItemTypes.SCHOOL, slotTarget, collect)(SchoolSlot);