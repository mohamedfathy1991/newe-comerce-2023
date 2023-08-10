const mongoose = require("mongoose");
const bcrypt= require('bcrypt')

const db_url = process.env.DB_URL;
const fs= require('fs')

const userschema = mongoose.Schema({
  name: { type: String, required: [true, "enter"], minlength: 3 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address:String,
  image:{type:String,required:true,
       default:"149071.png"}
});
userschema.methods.hashpassword = function(password){//new add methods in schema
  return bcrypt.hashSync(password,10)
}
userschema.methods.comparepassword = function(password){//new add methods in schema
  return bcrypt.compareSync(password,this.password)
}
const User = mongoose.model("users", userschema);

exports.adduser = async (userd) => {
  
  try {
    await mongoose.connect(db_url);

    let user = await User.findOne({ email: userd.email });
    if (user) {
      console.log(user)
      throw " email is used ";
    } else {
      let pass= userd.password
      console.log(pass)
      let newuser =  await new User({
        name: userd.name,
        email: userd.email,
        password: new User().hashpassword(pass)
      });
      await newuser.save();
      mongoose.disconnect();
      return newuser;
    }
  } catch (err) {
    throw err;
  }
};



exports.updateuser= async (newuser,id,olduserimage)=>{
 
  try{
    await mongoose.connect(db_url)
  let userupdate= {
    name:newuser.name,
    address:newuser.address,
    password : new User().hashpassword(newuser.password)

  }
 console.log(userupdate)

let user=      await User.updateOne({ _id: id }, { $set: userupdate  });

  mongoose.disconnect()
  console.log(user)
  return user
  }catch(err){
    throw err
  }

}
exports.uploadimage=async( id,image,imageoldimage)=>{


  
 
          try{
            

            
            await mongoose.connect(db_url)

            let images={image:image}
            



         await   User.updateOne({_id:id},{image:image})
         
         
         
      


          mongoose.disconnect()
          return 
          }catch(err){
            throw err
          }
}

exports.User=mongoose.model("users", userschema)