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

    var temp = [];
    var totalScore = [];

    var newFriendScores = setNumbers(newFriend.scores);
    console.log("Coverted N: " + newFriendScores);

    for(var i = 0; i < friends.length; i++) {
      temp[i] = setNumbers(friends[i].scores);
      console.log("Coverted " + i + ": " + temp[i])
      totalScore[i] = (getScore(temp[i], newFriendScores));
      console.log("Total " + i + ": " + totalScore[i]);
    }

    var min = totalScore[0];
    var minIndex = 0;

    for (var i = 1; i < totalScore.length; i++) {
      if (totalScore[i] < min) {
        minIndex = i;
        min = totalScore[i];
      }
    }

    console.log("Best match: " + friends[minIndex].name);
    response.json(friends[minIndex]);
    friends.push(newFriend);
  });

  function setNumbers(scores){
    var numbers = [];
    for(var i = 0; i < 10; i++)
    numbers[i] = parseInt(scores[i]);
    return numbers;
  }

  function getScore(a, b){
    var difference = [];
    var total = 0;
    for(var i = 0; i < 10; i++) {
      difference[i] = Math.abs(a[i] - b[i]);
      total += difference[i];   
    }
    
    return total;
  }
}
