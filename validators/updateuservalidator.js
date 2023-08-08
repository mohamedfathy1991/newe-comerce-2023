const check = require("express-validator").check;
const validatorResult = require("express-validator").validationResult;

class validatorcheck {
  static checkupdate = [
    check("name").not().isEmpty().withMessage("enter the name"),
    check("name").isLength({ min: 3 }).withMessage("name short"),
    check("address").not().isEmpty().withMessage("enter the address"),

    check("password").isLength({ min:3 }).withMessage("password is to short"),
    check("confirm-password").custom((value, { req }) => {
      console.log(req.body.password)
      if (value == req.body.password) return true;
      else throw "password not matched";
    }),
  ];

  static validatorresult = (req, res, next) => {
    const err = validatorResult(req);
    if (!err.isEmpty()) {
      req.flash("valerr", err.array());
  

      return res.redirect("/myorder");
    } else {
      next();
    }
  };
}

module.exports = validatorcheck;
