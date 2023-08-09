const cartmodel = require("../model/araycart");
const ordermodel = require("../model/order");

const stripe = require("stripe")(
  "sk_test_51NZhfRKzyoAtD1JuBXSOohuxIGkvwVZABepdQL9nwOQjA0qvjmdb6besE0r0FOhD2MDjGChUOZcyaHrdqssJD2vz00mR5DWIKh"
);

exports.addcart = (req, res, next) => {
  const userid = req.user._id.toString(); // i ned vale of id not new objectID('FDFSD)

  let product = {
    _id: req.params.id,
    price: +req.params.price,
    name: req.params.name,
    qnt: 1,
  };
  let price = +req.params.price;

  let producdid = req.params.id;

  cartmodel
    .addcart(userid, price, product, producdid)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
};

exports.getcart = (req, res, next) => {
  // if(!req.user.cart[0]){
  //   res.redirect('/')
  // }

  // idont need to get cart from model because i get it at session
  // cartmodel
  //   .getcart(req.user._id.toString())
  //   .then((data) => {

  res.render("profile", {
    checkerr:req.flash("checkout-err")[0],
    
    checklogin: true,
    cart: req.user.cart[0],
    name: req.user.name,
  });

  // })
  // .catch((err) => {
  //   next(err);
  // });
};

exports.deletproduct = (req, res, next) => {
  console.log("delet product");
  let productindex = req.params.index;
  let userid = req.user._id;
  console.log(productindex);

  cartmodel
    .deletproduct(userid, productindex, req)
    .then((cart) => {
      console.log(cart);
      req.user.cart = cart;
      console.log(req.user);

      res.redirect("/profile");
    })
    .catch((err) => {
      next(err);
    });
};

exports.increase = (req, res, next) => {
  let cart = req.user.cart[0];
  let producdid = req.params.id;
  userid = req.user._id;
  cartmodel
    .increase(producdid, req, userid)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      next(err);
    });
};
exports.decrease = (req, res, next) => {
  let cart = req.user.cart[0];
  let producdid = req.params.id;
  userid = req.user._id;
  cartmodel
    .decrease(producdid, req, userid)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      next(err);
    });
};

exports.checkcard = (req, res, next) => {
  res.render("checkbox", {

    errmesage: req.flash("checkout-err")[0],
    checklogin: true,
    cart: req.user.cart[0],
  });
};

exports.checkout = (req, res, next) => {
  let adress = req.body.address;
  console.log(adress);
  // Create a new customer and then create an invoice item then invoice it:
  stripe.charges
    .create({
      amount: req.user.cart[0].price * 100, // i dont know why multiplay 100
      currency: "usd",
      description: "One-time setup fee",
      source: req.body.stripeToken,
    })
    .catch((err) => {
      req.flash("checkout-err", err.raw.message);
      // Deal with an error
      console.log(err);
      res.redirect("/checkbox/card");
    })

    .then(async (charge) => {
      console.log("charege is");
      console.log(charge.id);

      ordermodel
        .addorder({
          userid: req.user._id,
          cart: req.user.cart,
          username: req.user.name,
          address: adress,
          paymintid: charge.id,
          orderprice: req.user.cart[0].price,
        })
        .then(() => {
          cartmodel
            .deletcard(req.user._id, res, next)
            .then(() => {

              req.flash("payment", "success payment");
              res.redirect("/");
            })
            .catch((err) => {
              console.log('err in delet card ')
              req.flash("checkout-err", err);
              // Deal with an error
              console.log(err);
              res.redirect("/cart");
              
                
            });
        }).catch(err=>{
          console.log('addorder cart')
          req.flash("checkout-err", err);
              // Deal with an error
              console.log(err);
              res.redirect("/cart");
        
    })});

  // have access to the customer object
};
