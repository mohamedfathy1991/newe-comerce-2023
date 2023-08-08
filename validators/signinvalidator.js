const check = require("express-validator").check;
const validatorResult = require("express-validator").validationResult;

class validatorcheck {
  static checksigin = [
    check("email").not().isEmpty().withMessage("enter the email"),
    check("email").isEmail().withMessage("enter valid email"),
    check("password").isLength({ min: 6 }).withMessage("password is to short"),
   
  ];

  static validatorresult = (req, res, next) => {
    const err = validatorResult(req);
    if (!err.isEmpty()) {
      req.flash("valerr", err.array());

      return res.redirect("/users/sinin");
    } else {
      next();
    }
  };
}

module.exports = validatorcheck;
