var express = require("express");
const passport = require("passport");
const auth = require("../authentication/isauth");

const scrf = require("csurf");

const validatorcheck = require("../validators/signupvalidators");
const signinvalidator = require("../validators/signinvalidator");
const updatevalidator = require("../validators/updateuservalidator");

const expressvalidator = require("express-validator");
const check = expressvalidator.check;
var router = express.Router();
const usercontrol = require("../control/usercontrol");
const multer=require('multer')

const storage= multer.diskStorage({
  destination:(req,File, cb)=>{
    cb(null,'public/profileimage')
  },
  filename:(req,file,cb)=>{
    
    cb(null ,  '-'+  Date.now()  + file.originalname)
  }
})

const upload=multer({
  storage:storage,
  limits: {
    fileSize: 1024 *  5//mean 5 mb
},
fileFilter:   (req, file, cb) => {
  if ( file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
  } else {
      return cb( new Error( 'Invalid mime type'));
  }}


}  ).single('image')
router.use(upload,(err,req,res,next)=>{


  if(err){
    console.log(err.message)
    req.flash('erruploadphoto',err.message)
  
    res.redirect('/myorder')
   
  }
  
})
const csurf = require("csurf");

router.use(csurf());

/* GET users listing. */
router.get("/sinup", auth.isnotlogin, usercontrol.getsignup);
router.post(
  "/sinup",
  auth.isnotlogin,
  validatorcheck.checksignup,
  validatorcheck.validatorresult,
  passport.authenticate("local-sinup", {
    session: false, //it is important because sinup not nedd sesiion
    successRedirect: "/users/sinin",

    failureRedirect: "/users/sinup",
    failureFlash: true,
  })
);
router.get("/sinin", auth.isnotlogin, usercontrol.getsignin);
router.post(
  "/sinin",
  auth.isnotlogin,
  signinvalidator.checksigin,
  signinvalidator.validatorresult,
  passport.authenticate("local-signin", {
    successRedirect: "/products",

    failureRedirect: "/users/sinin",
    failureFlash: true,
  })
);

router.get("/logout", auth.isSinin, (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
  });
  res.redirect("/");
});

router.post(
  "/update",
  
  updatevalidator.checkupdate,
  updatevalidator.validatorresult,usercontrol.updateuser
);
router.post(
  "/upload-image",
  
 usercontrol.uploadimage
);
module.exports = router;
