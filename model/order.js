const mongoose = require("mongoose");
const orderschema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    cart: { type: Object, require: true },
    address: { type: String, require: true },

    username: String,
    paymentid: { type: String, require: true },
    orderprice: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderschema);

exports.addorder = async (order,res,next) => {
  try {
    await mongoose.connect(process.env.DB_URL);

    let neworder = new Order({
      user: order.userid,
      cart: order.cart,
      address: order.address,
      username: order.username,
      paymentid: order.paymintid,
      orderprice: order.orderprice,
    });
    await neworder.save();
    mongoose.disconnect();
    return
  } catch (err) {
    mongoose.disconnect();
    console.log(err)
     throw "error in comection";
    
    
  }
};



exports.getorder= async(userid)=>{
try{
  await mongoose.connect(process.env.DB_URL)
  let order = await Order.find({user:userid},{updatedAt:false,_id:false})

  mongoose.disconnect()
  return order

}catch(err){

  mongoose.disconnect
  throw err
}
  
}