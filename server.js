// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Star Wars Characters (DATA)
// =============================================================
var friends = [{
  routeName: "sasha",
  name: "Sasha",
  photo: "http://www.wwe.com/f/styles/og_image/public/rd-talent/Bio/Sasha_Banks_bio.png",
  scores: ["4","3","5","2","1","2","4","2","3","2"]
}, {
  routeName: "charlotte",
  name: "Charlotte",
  photo: "http://www.wwe.com/f/styles/og_image/public/rd-talent/Bio/Charlotte_bio.png",
  scores: ["2","3","1","4","5","4","2","4","3","4"]
}, {
  routeName: "bayley",
  name: "Bayley",
  photo: "http://www.wwe.com/f/styles/wwe_large/public/all/2016/10/Bayley_bio--8d02c95a354b7eb05cdb0654e0dde57c.jpg",
  scores: ["1","2","3","4","5","5","4","3","2","1"]
}, {
  routeName: "becky",
  name: "Becky",
  photo: "http://www.wwe.com/f/styles/wwe_large/public/rd-talent/Bio/Becky_Lynch_bio.png",
  scores: ["3","4","5","4","5","1","2","2","4","4"]
}]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/friends", function(req, res) {
  
  //else {
    res.json(friends);
  //}
});

// Create New Characters - takes in JSON input
app.post("/api/friends", function(req, res) {
  var newFriend = req.body;
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

  console.log(newFriend);

  console.log(newFriend.scores);

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

  friends.push(newFriend);

  res.json(friends[minIndex]);
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

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
