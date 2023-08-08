const db_url = process.env.DB_URL;
const mongoose = require("mongoose");
const passport = require("passport");
const localstrategy = require("passport-local").Strategy;
const User = require("../model/usermodel");
const Cart= require('../model/araycart')
passport.serializeUser((user, done) => {
 
  return done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    await mongoose.connect(db_url);
    let user = await User.User.findOne({ _id: id },{email:true,name:true,_id:true});
    let usercart = await Cart.Cart.find({ userid: id });
       if(usercart){
        user.cart= usercart
       }
      
       return done(null, user)
       ;
  } catch (err) {
    return done(err, false);
  }
});
passport.use(
  "local-signin",
  new localstrategy(
    {
      
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      mongoose.connect(db_url).then(() => {
        User.User.findOne({ email: email }).then((result) => {
         
          if (!result) {
            console.log("no email");
            return done(null, false, req.flash("sininerr", "not email"));
          }
          if (!result.comparepassword(password)) {
            console.log("poass ewrer");
            return done(null, false, req.flash("sininerr", "not password"));
          }
          return done(null, result);
        });
      });
    }
  )
);

passport.use(
  "local-sinup",
  new localstrategy(
    {
      
      usernameField: "email",
      nameField: "name",
      passwordFieldField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      mongoose
        .connect(db_url)
        .then(() => {
          User.User.findOne({ email: email }).then((result) => {
            if (result) {
              return done(null, false, req.flash("error", "email is used"));
            }
            if (!result) {
              console.log(new User.User().hashpassword(password));
              let newuser = new User.User({
                email: email,
                name:req.body.name,
                password: new User.User().hashpassword(password),
              });
              newuser.save().then(() => {
                mongoose.disconnect();
                return done(null, newuser);
              }).catch(err=>{
                return done(err, false, req.flash("error", err));
              })
            }
          });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
