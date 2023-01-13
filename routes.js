
const express = require("express");
const db = require("./db");
const axios = require("axios");
const { profile } = require("console");
const html2canvas = require("html2canvas");

var router = express.Router();


router.get("/", (req,res,next)=>{

    res.render("home");
});


router.get("/privacy_policy", (req,res,next)=>{
    res.render("privacy_policy");
})


router.get("/info-popup", (req,res,next)=>{

    res.render("info-popup");
});



var main_photo_count = 0;
var child_photo_count = 0;
var media_content = {}

//used to display the right image 
var child_image_pressed = false;

router.get("/success", (req,res,next)=>{
    if (!req.user){

        res.redirect("/");
    }else{
        //Get request to get the all of the users photo id / captions
        axios.get(req.user.media).then(function(response){
            var userInfo = req.user
            var media_info = response.data.data
          
           
            
            media_content.amount_of_main_photos = media_info.length;


            var photo_id = media_info[main_photo_count].id
            var caption = media_info[main_photo_count].caption
            
            //GET request that takes the id of the photo the user chose and gets the url to show and the media type
            axios.get(`https://graph.instagram.com/${photo_id}?access_token=${userInfo.token}&fields=media_url,media_type`).then(function(getPhoto){
              
                // console.log(getPhoto.data);
                var photo_url = getPhoto.data.media_url;
            

                //Photo type is saying if it is a single photo or a carousel album with multiple photos
                var photo_type = getPhoto.data.media_type;
                // console.log(photo_type);

               
                if (photo_type == "CAROUSEL_ALBUM"){
                    //add another counter which the user can click left or right to choose which item in the album they want cahnge visibility css
                   
                    
                 
                    //GET request that will get all the photos for a specific album the user chooses - children
                    axios.get(`https://graph.instagram.com/${photo_id}/children?access_token=${userInfo.token}`).then(function(photoChildren){

                        var getChildPhoto = photoChildren.data.data
                        media_content.amount_of_child_photos = getChildPhoto.length;
            
                        var child_photo_id = getChildPhoto[child_photo_count].id;
                   
                    

                        //GET child photo url and change the ejs photo url to the new child url to update the photo
                        axios.get(`https://graph.instagram.com/${child_photo_id}?access_token=${userInfo.token}&fields=media_url,media_type`).then(function(childPhoto){
                            
                            var child_url = childPhoto.data.media_url;

                            if (child_image_pressed == true){
                                photo_url = child_url;
                            }
                            
    
                            res.render("success", {username:userInfo.username, photo:photo_url, cpc:child_photo_count, mpc: main_photo_count});
                        })
                    });
                }
                
                
            })
            
        })

    }
});




router.get("/increaseCount", (req,res,next)=>{
    //make sure user cant click over the amount of photos they hvae posted
    if ( main_photo_count < media_content.amount_of_main_photos-1){
        main_photo_count++;
    }
    child_photo_count = 0;
    child_image_pressed = false;
    res.redirect("/success");
})

router.get("/decreaseCount", (req,res,next)=>{
    if ( main_photo_count > 0){
        main_photo_count--;
    }
    child_photo_count = 0;
    child_image_pressed = false;
    res.redirect("/success");
})

router.get("/increaseChildCount", (req,res,next)=>{

    if (child_photo_count < media_content.amount_of_child_photos-1){
        child_photo_count++;
    }
    child_image_pressed = true;
    res.redirect("/success");
})

router.get("/decreaseChildCount", (req,res,next)=>{

    if (child_photo_count > 0){
        child_photo_count--;
    }
    child_image_pressed = true;
    res.redirect("/success");
})




router.post("/logout", (req,res,next)=>{

    req.logout(function(err){
        if (err){ return next(err)}
        res.redirect("/");
    });

});

////////////////CREATE FINAL IMAGE/////////////////////////////


router.get("/createImage", (req,res,next)=>{

    res.render("final_img");
})

router.post("/createImage", (req,res,next)=>{
    
    res.redirect("/createImage");
})





module.exports = router;
