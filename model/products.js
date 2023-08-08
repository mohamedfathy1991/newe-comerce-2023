const mongoose = require("mongoose");
const dburl = process.env.DB_URL;

const productschema = mongoose.Schema({
  name: { type: String, required: [true, "name name"] },
  information: {
    required: true,
    type: {
      memory: String,
      screen: String,
    },
  },
  image: {
    required: true,
    type: String,
  },
  price: Number,
});

const Product = mongoose.model("products", productschema);

// exports.addproduct = () => {
//   return new Promise((resolve, reject) => {
//     mongoose
//       .connect(dburl)
//       .then(() => {
//         let product = [
//           new Product({
//             name: "oppo",
//             information: {
//               memory: "8G",
//               screen: "8inch",
//             },
//             image: "mobi3.jpg",
//             price: 10000,
//           }),
//           new Product({
//             name: "A20",
//             information: {
//               memory: "4G",
//               screen: "16inch",
//             },
//             image: "mobi2.jpg",
//             price: 5000,
//           }),
//           new Product({
//             name: "samsung",
//             information: {
//               memory: "4G",
//               screen: "8inch",
//             },
//             image: "mobi1.jpg",
//             price: 15000,
//           }),
//         ];
//         for (i = 0; i < product.length; i++) {
//           product[i].save();
//           return product;
//         }
//       })
//       .then((product) => {
//         console.log(product);

//         resolve(product);
//       })
//       .catch((err) => {
//         reject(err);
//         reject("conection faild");
//       });
//   });
//  };

exports.getproduct = async () => {
  try {
    await mongoose.connect(dburl);
    // let q = 'op'
    // let porduct = await Product.find( {name:{$regex:new RegExp(q)} }); search by word
    // console.log(Product)
    let porduct = await Product.find( {} )
    await mongoose.disconnect();
    return porduct;
  } catch (err) {
    throw err;
  }
};
