/* =================== */
/*     DEPENDENCIES    */
/* =================== */
var express      = require("express");          // Node.js framework
var yelp         = require("yelp-fusion");      // Yelp Fusion API
var foodList     = require("./exports/food-list.js");

/* =================== */
/*    CONFIGURATIONS   */
/* =================== */
var app = express();
app.set("view engine", "ejs");                  // So it'll say on EJS by default when rendering
app.use(express.static(__dirname + "/public"));

app.listen(3000, function() {
    console.log("Server is working properly, Bryan.");
});

/* =================== */
/*      RANDOM FOOD    */
/* =================== */

function generateRandomFood(max){               // Generate a random food from food list
    var x = Math.random() * (max - 1) + 1;
    return foodList[Math.floor(x)];
}

function generateRandomNum(max){                // Generate a random restaraunt
    var max = max-1;
    var x = Math.random() * (max);
    return Math.floor(x);
}

/* =================== */
/*       ROUTING       */
/* =================== */
// Get the root page
app.get("/", function(req, res){
    res.render("index");
});

// Getting results page
app.get("/results", function(req, res){
    var location = req.query.location;
    /* ~~~~~~~~~~~~~~~ */
    /*     API REQ     */
    /* ~~~~~~~~~~~~~~~ */
    // Input API's clientID and clientSecret
    var clientId = "-";
    var clientSecret = "-";

    // Retrieve API Access Token
    var token = yelp.accessToken(clientId, clientSecret).then(response => {
        makeAPICall(response.jsonBody.access_token);
    }).catch(e => {
        res.render("error");
    });

    // Make API call
    function makeAPICall(token) {
        // Allow us to use the yelp API client
        const client = yelp.client(token);
        // Generate a random food every time we load
        var food = generateRandomFood(foodList.length);
        
        // Search
        client.search({
            term: food,
            location: location
        }).then(response => {  
            // Generate a random restauraunt of the list of restaurants
            var num = generateRandomNum(response.jsonBody.businesses.length);
            // If everything godes swell, find a specific restaurant and push that into the rendered page
            if(response.jsonBody.businesses[num].name !== "undefined"){
                var business = response.jsonBody.businesses[num];
                res.render("results",  {food: food, location: location, business: business});  
            } else { // If not, just send in error page
                console.log("I'm in the else");
                console.log(food);
                res.render("error");
            }
        }).catch(e => {
                            console.log("I'm outside the else");
                console.log(food);
            res.render("error");
        });
    }
});