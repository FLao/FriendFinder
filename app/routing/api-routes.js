var path = require("path");
var friends = require("../data/friends");

// Display all friends - provides JSON
module.exports=(app)=>{
    app.get("/api/friends", function(request, response) {
        response.json(friends);
    });

// Create new friend - takes in JSON input
    app.post("/api/friends", function(request, response) {
        var newFriend = request.body;
    
        console.log(newFriend);

        var friendsScores = [];
        var totalScore = [];

        var newFriendScores = setStringsToNumbers(newFriend.scores);
        console.log("Coverted N: " + newFriendScores);

        for(var i = 0; i < friends.length; i++) {
            friendsScores[i] = setStringsToNumbers(friends[i].scores);
            console.log("Coverted " + i + ": " + friendsScores[i])
            totalScore[i] = (getTotal(friendsScores[i], newFriendScores));
            console.log("Total " + i + ": " + totalScore[i]);
        }

        console.log("Best match: " + friends[getLowestTotalIndex(totalScore)].name);
        response.json(friends[getLowestTotalIndex(totalScore)]);

        friends.push(newFriend);
    });

    function setStringsToNumbers(strArray){
        var numbers = [];
        
        for(var i = 0; i < 10; i++)
            numbers[i] = parseInt(strArray[i]);
        
        return numbers;
    }

    function getTotal(numArray1, numArray2){
        var difference = [];
        var total = 0;
        
        for(var i = 0; i < 10; i++) {
            difference[i] = Math.abs(numArray1[i] - numArray2[i]);
            total += difference[i];   
        }
    
        return total;
  }

    function getLowestTotalIndex(numArray) {
        var min = numArray[0];
        var minIndex = 0;

        for (var i = 1; i < numArray.length; i++) {
            if (numArray[i] < min) {
                minIndex = i;
                min = numArray[i];
            }
        }

        return minIndex;
    }
}
