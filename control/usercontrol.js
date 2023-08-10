var createError = require("http-errors");
const usermodel= require('../model/usermodel')
const User = require("../model/usermodel");




exports.adduser=(req,res,next)=>{


    
    usermodel.adduser({
        name:req.body.name,email:req.body.email,password:req.body.password,
        
    }).then(()=>{
        console.log('add')
        res.redirect('/users/sinin')
    }).catch(err=>{
        console.log('err is')
       
        req.flash('error',err)
      
        
         res.redirect('/users/sinup')
    })





}
exports.getsignup=(req,res)=>{

    let token= req.csrfToken()
  
    res.render('signup',{valerr:req.flash('valerr'),token:token,checklogin:req.isAuthenticated(),cart:null,
error: req.flash('error')[0]})
}

exports.getsignin=(req,res)=>{
   
    let token= req.csrfToken()



    
    res.render('sinin',{valerr:req.flash('valerr'),sinerr:req.flash("sininerr")[0],cart:null,token:token,checklogin:req.isAuthenticated(),
error: req.flash('error')[0]})
}

exports.updateuser=(req,res,next)=>{
    console.log('update users')
    usermodel.updateuser({

    name:req.body.name,
    address:req.body.address,
    password:req.body.password,
},req.user._id).then((user)=>{
    console.log(user)
    res.redirect('/myorder')

}).catch(err=>{
    next(err)

})

}

exports.uploadimage=(req,res,next)=>{
    usermodel.uploadimage(req.user.id,req.file.filename).then(()=>{
        
        res.redirect('/myorder')
    }).catch(err=>{
res.json(err)    })
  }