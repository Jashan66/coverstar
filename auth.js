require("dotenv").config();
const express = require("express");
const passport = require("passport");

const InstagramStrategy = require("passport-instagram").Strategy;
// const InstagramStrategy = Instagram.Strategy;
// const db = require("./db");


var router = express.Router();



passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_APP_ID,
    clientSecret: process.env.INSTAGRAM_SECRET,
    callbackURL: "https://mag-fame.herokuapp.com/auth/instagram/callback",
  },
  function(accessToken, refreshToken, profile, done) {



   
    //Once user is authenticated the access token will be here along with profile id both needed to get api data
    //Check if user exists in db if not create a new proifle for them
    let user = {};
    user.token = accessToken
    user.id = profile.id
    user.username = profile.username
    user.media = `https://graph.instagram.com/${profile.id}/media?access_token=${accessToken}&fields=id,timestamp,caption`;
   
    done(null,user);
    // db.findOrCreate({ instagramId: profile.id }, function (err, user) {
    //   console.log(profile.id);
    //   return done(err, user);
    // });
    

  }
));






passport.serializeUser(function(user, cb) {

  process.nextTick(function() {
    return cb(null,user)
  });
});

passport.deserializeUser(function(user, cb) {
  
  process.nextTick(function() {
    return cb(null, user);
  });
});



router.get("/auth/instagram", passport.authenticate("instagram", {scope: ["user_profile","user_media"] }));


router.get("/auth/instagram/callback", passport.authenticate("instagram", {successRedirect: "/success", failureRedirect: "/"}), (req,res,next)=>{

  
    //Successful authentication redirect to callback
    
});



// module.exports = router;
exports.auth = router;

