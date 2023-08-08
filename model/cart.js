const mongoose = require("mongoose");
const cartschema = mongoose.Schema({
  userid: { requred: true, type: String },

  price: { type: Number, require: true },
  amount: { type: Number, default: 1, requred: true },

  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

const Cart = mongoose.model("carts", cartschema);
exports.Cart=Cart

exports.addcart = async (userid, price, productid) => {
  try {
    await mongoose.connect(process.env.DB_URL);
    let carts = await Cart.find({ userid: userid });
    if (!carts.length > 0) {
      console.log("no cart");

      let newcart = new Cart({
        userid: userid,
        price: price,
        product: productid,
      });

      await  newcart.save();
    
      mongoose.disconnect();
      return
    } else {
      console.log("product id   ....");

  
      console.log("asdsadaaa");
      let data=carts.filter((x) => (x.product == productid))
      console.log(data)

      if(data.length>0)  {
        console.log("update");

        await Cart.updateOne(
          { product: productid },
          {
            amount:data[0].amount +1,

            price: (data[0].amount +1)* price,
          }
        );
        return
      }else{

        console.log("new product idddddddd");
        let newcart = new Cart({
          userid: userid,
          price: price,
          product: productid,
        });
        await newcart.save()
        mongoose.disconnect();
        return
      }
     
    }
  } catch (err) {
    throw err;
  }
};

exports.getcart = async (userid) => {
  try {
    await mongoose.connect(process.env.DB_URL);
    let data = await Cart.find({ userid: userid }).populate("product");
    console.log(data);

    mongoose.disconnect();
    return data;
  } catch (err) {
    mongoose.disconnect();
    throw err;
  }
};
