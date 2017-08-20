/* =================== */
/*     DEPENDENCIES    */
/* =================== */
var express      = require("express");       // Node.js framework
var yelp         = require("yelp-fusion");   // Yelp Fusion API
var food         = require("./random-food.js");
/* =================== */
/*    CONFIGURATIONS   */
/* =================== */
var app = express();
app.set("view engine", "ejs");               // So it'll say on EJS by default when rendering

/* =================== */
/*       API REQ       */
/* =================== */
// Input API's clientID and clientSecret
var clientId = "hidden";
var clientSecret = "hidden";

// Retrieve API Access Token
var token = yelp.accessToken(clientId, clientSecret).then(response => {
    makeAPICall(response.jsonBody.access_token);
}).catch(e => {
    console.log(e);
});

function makeAPICall(token) {
    // Make API call
    const client = yelp.client(token);
    
    client.search({
        term:'tacos',
        location: 'Dallas, TX'
    }).then(response => {
      console.log(response.jsonBody.businesses[0].name);
    }).catch(e => {
      console.log(e);
    });
}

app.listen(3000, function() {
    console.log("Server is working properly, Bryan.");
});