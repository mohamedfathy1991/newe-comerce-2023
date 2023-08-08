const mongoose = require("mongoose");
const cartschema = mongoose.Schema({
  userid: { requred: true, type: String },

 
  date: {
    type: Date,
    default: Date.now(),
    index: {
      expires: '2m'
    }
  },
  
  
  price: { type: Number, require: true },
  qnt: { type: Number, require: true, default: 1 },

  product: [],


  
});



const Cart = mongoose.model("arraycarts", cartschema);

exports.Cart = Cart;

exports.addcart = async (userid, prices, newproduct, productid) => {
  try {
    await mongoose.connect(process.env.DB_URL,{useCreateIndex:true});
    let carts = await Cart.find({ userid: userid }, { _id: false });
    //  check if there is is cart or not
    console.log(carts.product);
    if (!carts.length > 0) {
      // no cart and will  make new cart
      let newcart = new Cart({
        userid: userid,
        price: prices,

        product: newproduct,
      });

      await newcart.save();
      mongoose.disconnect();
    } else {
      //there is acart but i will check if add new product or update product

      let index_ofproduct = -1;

      carts.forEach((element) => {
        for (i = 0; i < element.product.length; i++) {
          if (element.product[i]._id === productid) {
            index_ofproduct = i;

            break;
          }
        }
      });
      if (index_ofproduct >= 0) {//update product
        console.log("producr contain");

        let sameproduct = {
          _id: newproduct._id,
          price: newproduct.price,
          name: newproduct.name,
          qnt: newproduct.qnt + 1,
        };

        //  await Cart.updateOne({userid:userid,product[0].name:'a10'},{$inc:{price:newproduct.price,qnt:1}})

        await Cart.updateOne(
          { userid: userid },
          {
            $inc: { price: newproduct.price, qnt: 1 },
            $pull: { product: { _id: productid } },
          }
        );
        await Cart.updateOne(
          { userid: userid },
          { $push: { product: sameproduct },
          $set:{date:Date.now()} }
        );

        mongoose.disconnect();
        return;
      } else {// add new product

        let oldprice = carts[0].price;
        //$inc in stead of price: oldprice+ newproducr
        await Cart.updateOne(
          { userid: userid },
          {
            $inc: { price: newproduct.price, qnt: 1 },
            $push: { product: newproduct },
            $set:{date:Date.now()}
          }
        );
        mongoose.disconnect();
        return;
      }
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
};

exports.getcart = async (userid) => {
  try {
    await mongoose.connect(process.env.DB_URL);
    let data = await Cart.find({ userid: userid });
    console.log(data);

    mongoose.disconnect();
    return data;
  } catch (err) {
    mongoose.disconnect();
    throw err;
  }
};

exports.deletproduct = async (userid, productindex, req) => {

  const cart = req.user.cart[0];
  
  try {
  
      cart.qnt = cart.qnt - cart.product[productindex].qnt;
      cart.price = (cart.price -(cart.product[productindex].qnt * cart.product[productindex].price));
    console.log('cart product')
    console.log(cart.product)

    if(cart.product.length==1){
      console.log('delet the end item')
      await Cart.deleteOne(  { userid: userid });

      return


     }
     cart.product.splice(productindex,1);

     
      await mongoose.connect(process.env.DB_URL);
      
  
        await Cart.updateOne(  { userid: userid },{ $set: cart});
  
      mongoose.disconnect();
      return cart; 
    

      

    
    
  } catch (err) {
    mongoose.disconnect();
    throw err;
  }
};

exports.increase = async (productid, req, userid) => {
  let cart = req.user.cart[0];
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log(cart.product[productid].qnt);

    cart.product[productid].qnt = cart.product[productid].qnt + 1;
    cart.qnt = cart.qnt + 1;
    cart.price = cart.price + cart.product[productid].price;
    cart.data=Date.now()

    await Cart.updateOne({ userid: userid }, { $set: cart });
  } catch (err) {
    mongoose.disconnect();
    throw err;
  }
};
exports.decrease = async (productid, req, userid) => {
  let cart = req.user.cart[0];
  try {
    await mongoose.connect(process.env.DB_URL);


    cart.product[productid].qnt = cart.product[productid].qnt - 1;
    cart.qnt = cart.qnt - 1;
    cart.price = cart.price - cart.product[productid].price;
    cart.data=Date.now()


    await Cart.updateOne({ userid: userid }, { $set: cart });
  } catch (err) {
    mongoose.disconnect();
    throw err;
  }
};


exports.deletcard=async(id,res,next)=>{

  try {
    await mongoose.connect(process.env.DB_URL);

    await Cart.deleteOne({userid:id})

     mongoose.disconnect()
     
  }catch(err){
   throw" err in mongoose conection"
  }
}