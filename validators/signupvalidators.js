const check = require("express-validator").check;
const validatorResult = require("express-validator").validationResult;

class validatorcheck {
  static checksignup = [
    check("name").not().isEmpty().withMessage("enter the name"),
    check("name").isLength({ min: 3 }).withMessage("name short"),
    check("email").not().isEmpty().withMessage("enter the email"),
    check("email").isEmail().withMessage("enter valid email"),
    check("password").isLength({ min: 6 }).withMessage("password is to short"),
    check("confirm-password").custom((value, { req }) => {
      if (value == req.body.password) return true;
      else throw "password not matched";
    }),
  ];

  static validatorresult = (req, res, next) => {
    const err = validatorResult(req);
    if (!err.isEmpty()) {
      req.flash("valerr", err.array());

      return res.redirect("/users/sinup");
    } else {
      next();
    }
  };
}

module.exports = validatorcheck;
