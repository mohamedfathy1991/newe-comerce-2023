const productmodel = require("../model/products");
const path=require('path')

exports.addproduct = (req, res, next) => {
  console.log(req.user);

  productmodel
    .addproduct()
    .then((product) => {
      res.render("index", {
        checklogin: req.isAuthenticated(),
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);

      next(err);
    });
};
exports.getproduct = (req, res, next) => {
console.log(req.user)
  let cart = null;
  if (req.isAuthenticated()) {
    
    
      cart=req.user.cart[0]
    

  }


 



  // console.log((req.user._id.toString()))//*****   to convert new objectID('dssd')==> to string */

  productmodel
    .getproduct()

    .then((product) => {
      res.render("index", {
        successpayment:req.flash('payment')[0],
        
        checklogin: req.isAuthenticated(),
        products: product,cart:cart
      });
    })
    .catch((err) => {
      console.log(err);

      next(err);
    });
};
