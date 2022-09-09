const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

//use body parser to get data user inputs to body of website
app.use(bodyParser.urlencoded({extended: true}));

//get live data using an API.
app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

}); 

//form submission catches user input on browser
app.post("/", function( req, res) {

//retrieving data based on user entered zip code
const zipQuery = req.body.zipCode;
const apiKey = "3de5b57c8faedcf058660bee94f64563";
const unit = "Imperial";
const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipQuery + "&appid="+ apiKey + "&units=" + unit;


    //https get method for getting API data from an online source as a JSON format
    https.get(url, function (response) {
        //make sure server/site request is valid
        console.log(response.statusCode);

        //parsing retrieved JSON data and logging to the console
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            //check to make sure we're retrieving correct data
            console.log(weatherData);

            //set constants to specific data we want
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const cityName = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const weatherIcon = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            
            //display retrieved information onto browser in HTML format
            res.write("<h1> The weather in " + cityName + " can be described as " + description + ". " );
            res.write("The temp in your ZIP code is " + temp + " degrees F. </h1>");
            //display icon
            res.write("<img src=" + weatherIcon + ">");
            res.send();
        });
    });

    //console logging data from input
    console.log(req.body.zipCode);
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});