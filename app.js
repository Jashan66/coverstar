const express = require("express")
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));




app.get("/",(req,res)=>{

   

    res.sendFile(__dirname + "/index.html"); 
});


app.post("/", (req,res)=>{

    
    console.log("clicked");
    res.redirect("https://api.instagram.com/oauth/authorize?client_id=1106629183360073&redirect_uri=https://localhost:3000/auth&scope=user_profile,user_media&response_type=code")

    // user_id = 
    //access_token = 
    //secret = bab386fe83f9a49f3888d090bc48948f
    // code --- this expires every hour so might need to get a new one= AQDyIPeB3Ym86I3AxAUwlu3qPmq3sh4J4wvoHMPDSAI9hlEZgT3zJFZw3qEmCrFUVPPHf8_X4GpkoisystUCECp306gcVZYs-u6BH-omche0_C8Y8vrHBDEUnZFaAC2wuWubYxvSQIKJoVhLHO2C0umj8DO797mrPlp5JZsV1G8TwfxM69ejTXQN9PWsakV8yQNTymWE0rHyxbC2BSL3hhivkcgkZ7XHneAAihtrw7FjPQ
    // TO GET NEW CODE CLICK BUTTON ON HOME PAGE AND COPY CODE IN URL
    // ?client_id={app-id}
    // &redirect_uri={redirect-uri}
    // &scope=user_profile,user_media
    // &response_type=code

});

app.get("/auth", (req,res)=>{


    res.sendFile(__dirname + "/success.html");
});








app.listen(3000, (req,res)=>{

    console.log("Server Running!");
})