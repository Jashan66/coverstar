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

    // user_id -- unique id to indentify instagram user = 17841404506540519
    //Instagram APP id = 1106629183360073
    //LONG LIVE ACCESS TOKEN = "IGQVJYTGJCWjBwYy1VNlltcDdNcHREQ1ZA1ME9kcVJUWURXeHpwSXpfQzRycWRTMUV4a0l5QWF2UzJZANEdGc0NTY2t4QVJWQmhHTk1qYkM3QjIxdmtJQVBtTUxKeFQyMlR5Y0RHdWln"
   
    //secret = bab386fe83f9a49f3888d090bc48948f
    // code --- this expires every hour so might need to get a new one= AQCoCXIHMUL9pSMCSHhkUngp_aNxIBN5XsgPRUEJmn3K9ayJy11VBYI6w2H59xSb8XJmljtSiyQLfi78FU9ybvQvVaYbdXypuxpiyvnGw3wLMZODzCu7RpCTUo7RDaOxOh2h-X-A8jtRckCBgimMKfa-97Yi5m8aHrZIm0XrmCgK8B9-Au9Q4d-OvsbJZEGZW83lHCdJDKMLMkMGyh7DOXVNGTWPUjREf-1l26x-KCItdw-u6BH-omche0_C8Y8vrHBDEUnZFaAC2wuWubYxvSQIKJoVhLHO2C0umj8DO797mrPlp5JZsV1G8TwfxM69ejTXQN9PWsakV8yQNTymWE0rHyxbC2BSL3hhivkcgkZ7XHneAAihtrw7FjPQ
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