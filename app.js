"use strict";

var https = require('https');
var fs = require('fs');
var bodyParser = require("body-parser")
var express = require("express");

var app = express()

var http = require("http").Server(app);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));

var port = process.env.PORT || 3000;

app.get("/", function(req, res){
  res.sendFile("parity.html", {root: __dirname + "/public/"})
})

var webServer = http.listen(port, function(){
  console.log('listening on *:' + port);
});



