import { React } from '../importPackage';

class DraftOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentPosition: 5}
  }

  render() {
    let draftPositions = [];
    // this.props.order.forEach((round)=>{
    //   draftPositions = draftPositions.concat(round);
    // });
    // let draftTeams = draftPositions.map((position)=>{
    //   return <li className = "draftPosition">{position.team_name}</li>
    // });

    return (
      <ul className = "draftOrder">
      </ul>
      )
  }

}


export default DraftOrder;