import {React, ReactDOM} from '../importPackage';
import TopTarget from './topTarget.jsx.js';
import BottomTarget from './bottomTarget.jsx.js';





class SchoolSlot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hovering: false}

  }

  handleMouseOver(e) {
    this.setState ({hovering: true});
  }

  handleMouseOut(e) {
    this.setState ({hovering: false});
  }

  render () {

    let background = this.props.rank % 2 === 0 ? '#a081a5' : 'inherit';
    let hoverBackground = this.state.hovering ? '#e7ceeb' : background;
    return (
      <div
      className="schoolSlot"
      style = {{position: 'relative', height: '20px', 'backgroundColor': hoverBackground}}
      onMouseOver = {this.handleMouseOver.bind(this)}
      onMouseOut = {this.handleMouseOut.bind(this)}>
        <TopTarget { ...this.props} />
        <BottomTarget { ...this.props} />
      </div>
    )
  }

}


module.exports = SchoolSlot;