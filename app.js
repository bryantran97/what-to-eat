/* =================== */
/*     DEPENDENCIES    */
/* =================== */
var express      = require("express");          // Node.js framework
var yelp         = require("yelp-fusion");      // Yelp Fusion API
var foodList     = require("./food-list.js");

/* =================== */
/*    CONFIGURATIONS   */
/* =================== */
var app = express();
app.set("view engine", "ejs");                  // So it'll say on EJS by default when rendering

/* =================== */
/*      RANDOM FOOD    */
/* =================== */

function generateRandomFood(max){               // Generate a random food from food list
    var x = Math.random() * (max - 1) + 1;
    return foodList[Math.floor(x)];
}
var food = generateRandomFood(foodList.length);

function generateRandomNum(max){                // Generate a random restaraunt
    var x = Math.random() * (max);
    return Math.floor(x);
}

/* =================== */
/*       ROUTING       */
/* =================== */
app.get("/", function(req, res){
    res.render("index");
});

app.get("/results", function(req, res){
    var location = req.query.location;
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
        const client = yelp.client(token);

        client.search({
            term: food,
            location: location
        }).then(response => {  
            // Generate a random restauraunt of the list of restaurants
            var num = generateRandomNum(response.jsonBody.businesses.length);
            // Retrieve Object specific information of this restaurant
            res.render("results", {food: food, location: location, business: response.jsonBody.businesses[num]});
            
            console.log(response.jsonBody.businesses[num]);
        }).catch(e => {
          console.log(e);
        });
    }
});

app.listen(3000, function() {
    console.log("Server is working properly, Bryan.");
});