PlayersList = new Mongo.Collection('players');


if(Meteor.isClient){



  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find();
    },
    'count': function(){
      return PlayersList.find().count();
    }
  });

  Template.leaderboard.events({
    "click .player": function(event, template){
      var playerId = "session value test";
      Session.set('selectedPlayer', 'session value test');
      Session.get('selectedPlayer');
    }
  });

}

if(Meteor.isServer){
  console.log("Hello Server");
}
