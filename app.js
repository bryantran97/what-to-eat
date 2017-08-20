/* =================== */
/*     DEPENDENCIES    */
/* =================== */
var express      = require("express");       // Node.js framework
var yelp         = require("yelp-fusion");   // Yelp Fusion API
var foodList         = require("./food-list.js");

/* =================== */
/*    CONFIGURATIONS   */
/* =================== */
var app = express();
app.set("view engine", "ejs");               // So it'll say on EJS by default when rendering

/* =================== */
/*      RANDOM FOOD    */
/* =================== */
function generateRandomFood(max){
    var x = Math.random() * (max - 1) + 1;
    return foodList[Math.floor(x)];
}
var food = generateRandomFood(foodList.length);
console.log(food);

/* =================== */
/*       API REQ       */
/* =================== */
// Input API's clientID and clientSecret
var clientId = "-";
var clientSecret = "-";

// Retrieve API Access Token
var token = yelp.accessToken(clientId, clientSecret).then(response => {
    makeAPICall(response.jsonBody.access_token);
}).catch(e => {
    console.log(e);
});

// Make API call
function makeAPICall(token) {
    // Make API call
    const client = yelp.client(token);
    
    client.search({
        term: food,
        location: 'Dallas, TX'
    }).then(response => {
        console.log(response.jsonBody);
    }).catch(e => {
      console.log(e);
    });
}

app.listen(3000, function() {
    console.log("Server is working properly, Bryan.");
});