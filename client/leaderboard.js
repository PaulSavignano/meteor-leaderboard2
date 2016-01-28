Meteor.subscribe('thePlayers');

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
    Meteor.call('modifyPlayerScore', selectedPlayer, points);
  },
  'click .decrement': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    var points = Session.get('points');
    Meteor.call('modifyPlayerScore', selectedPlayer, points);
  },
  'change .points': function(event) {
    var points = event.target.value;
    Session.set('points', Number(points));
    console.log(points);
  },
  'click .remove': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('removePlayerData', selectedPlayer);
  }
});



Template.addPlayerForm.events({
  'submit form': function(event) {
    event.preventDefault();
    var playerNameVar = event.target.playerName.value;
    var playerScoreVar = Number(event.target.playerScore.value);
    Meteor.call('insertPlayerData', playerNameVar, playerScoreVar);
  }
});
