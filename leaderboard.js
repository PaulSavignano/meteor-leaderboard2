PlayersList = new Mongo.Collection('players');


if(Meteor.isClient){


  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find({}, {sort: {score: -1, name: 1}});
    },
    'count': function(){
      return PlayersList.find().count();
    },
    'selectedClass': function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer) {
        return "selected"
      }
    },
    'points': function() {
      var pointsForPlayer;
      if(Session.get('points')) {
        pointsForPlayer = Session.get('points');
      } else {
        pointsForPlayer = 1;
      }
      return pointsForPlayer;
    },
    'showSelectedPlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }
  });


  Template.leaderboard.events({
    "click .player": function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      var points = Session.get('points');
      PlayersList.update(selectedPlayer, {$inc: {score: points}});
      console.log("added ", points, " points to ", selectedPlayer);
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      var points = Session.get('points');
      PlayersList.update(selectedPlayer, {$inc: {score: -points}});
      console.log("removed ", points," points from ", selectedPlayer)
    },
    'change .points': function(event) {
      var points = event.target.value;
      Session.set('points', Number(points));
      console.log(points);
    },
    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
    }
  });



  Template.addPlayerForm.events({
    'submit form': function(event) {
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      var playerScoreVar = Number(event.target.playerScore.value);
      PlayersList.insert({
        name: playerNameVar,
        score: playerScoreVar
      });
      console.log("form submitted!")
      console.log(event.type)
      console.log(playerNameVar);
      console.log(playerScoreVar)
      event.target.playerName.value = '';
      event.target.playerScore.value = 1;
    }
  });


}

if(Meteor.isServer){
  console.log("Hello Server");
}
