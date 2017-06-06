PlayersList = new Mongo.Collection('players');
Template.leaderbord.helpers({
    player: function(){
        var currentUserId = Meteor.userId();
        return PlayersList.find({ createdBy: currentUserId },
            { sort: {score: -1, name: 1} });
    },
    'selectedClass': function() {
        var playerId = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        if (playerId == selectedPlayer) {
            return "selected"
        }
    },
    'selectedPlayer': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.findOne({ _id: selectedPlayer });
    }
});
Template.leaderbord.events({
    'click .player': function(){
        var playerId = this._id;
        Session.set('selectedPlayer', playerId);
        var selectedPlayer = Session.get('selectedPlayer');
    },
    'click .increment': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('updateScore', selectedPlayer, 5);
    },
    'click .decrement': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('updateScore', selectedPlayer, -5);
    },
    'click .remove': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('removePlayer', selectedPlayer);
    }
});
Template.addPlayerForm.events({
    'submit form': function(event){
        event.preventDefault();
        var playerNameVar = event.target.playerName.value;
        Meteor.call('createPlayer',playerNameVar);
        event.target.playerName.value = "";
    }
    });
Meteor.subscribe('thePlayers');




