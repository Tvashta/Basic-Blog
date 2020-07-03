//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");
var _ = require('lodash');


const homeStartingContent = "Let it be like winter, painting everything platinum with its icy fangs, the world devoid of movement, locked in stillness with everything beautiful beautified in a monotonous strict tone, reminding the world of order, or like the skipping summer, lifting everyone's spirits, the perspiration glistening proudly as a souvenir of the heights reached. Let it be happy, sad, furious, or even just a mere rant. Anything and everything the mind muses over are worth staging. Paint your expressions on our canvass and let us all gawk in awe. " ;
const aboutContent = "Hey you curious soul! Want to get to know more about us? Then come on, let's get comfy, shall we? Get ready for some superb-flaunting coz come on this blog is all about letting everything in the mind out!";
const contactContent = " Come on, get comfortable, wrap your blankets and snuggle in the couch. All cozy? Well, now let us chat over a hot cup of Horlicks or a scoop of Chocolate ice-cream, shall we? Oh and bring your own milkshakes!";

const app = express();

app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://vyalah:Magic@cluster0-nxdvk.mongodb.net/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const blogSchema = new mongoose.Schema({
  title: String,
body: String
});

const Post= new mongoose.model("post",blogSchema);


app.get("/",function(req,res){
let posts=[];
Post.find({},function(err,posts){
  if(!err){
      res.render("home",{hPara: homeStartingContent, posts: posts});
  }
});

});

app.get("/about",function(req,res){
  res.render("about",{aPara: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{cPara: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  var content=new Post({
    title:  req.body.postTitle,
    body:  req.body.postBody
  });

  content.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});

app.get("/post/:topic",function(req,res){
  let s=req.params.topic;
  Post.findOne({_id: s},function(err,post){
    if(!err){
      res.render('post',{postObj: post,
      imgname: __dirname+"/images/Posts.png"});
    }
  });

});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}





app.listen(port, function() {
  console.log("Server started on port 3000");
});
