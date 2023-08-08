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
module.exports = router;
