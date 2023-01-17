require("dotenv").config();
const express = require("express")
const fs = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const html2canvas = require("html2canvas");

require('https').globalAgent.options.rejectUnauthorized = false;
const app = express();


var routing = require("./routes");
var {auth} = require("./auth");

// var db = require("./db");


// SSL SERVER CERTIFICATE
const key = fs.readFileSync("./CA/localhost/localhost.decrypted.key");
const cert = fs.readFileSync('./CA/localhost/localhost.crt');
const server = https.createServer({key,cert},app);
// SSL SERVER CERTIFICATE


app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


app.use(session({

    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
    }));



app.use(passport.initialize());
app.use(passport.session());


app.use("/", routing);
app.use("/", auth);
app.use("/success", routing);



let port = process.env.PORT;
if (port == null || port == ""){
    port = 8000;
}

app.listen(port);


server.listen(3000,()=>{
    
    console.log("Server running on port!");
})


module.exports = app;
