import { Reflux } from '../importPackage';
import TeamPoolActions from '../actions/TeamPoolActions';

var TeamPoolStore = Reflux.createStore({
  listenables: [TeamPoolActions],

  onRerank: function(drag, drop, currentRank, newRank, position, schoolsList) {
    console.log(arguments)
    let dragId = drag.props.schoolId;
    let newOrder = schoolsList.map((school, index)=>{
      if (newRank < currentRank) {

        if (index < newRank || index > currentRank-1) {
          return school;
        } else if (index === newRank) {
          return schoolsList[currentRank-1];
        } else {
          return schoolsList[index-1];
        }
      } else {
        if (index < currentRank-1 || index >= newRank) {
          return school;
        } else if (index === newRank-1) {
          return schoolsList[currentRank-1];
        } else {
          return schoolsList[index+1];
        }
      }
    });
    this.trigger({schoolsList: newOrder});
  }
});

export default TeamPoolStore;