


const cartmodel = require("../model/cart");

exports.addcart=(req,res,next)=>{
    const userid= (req.user._id.toString())// i ned vale of id not new objectID('FDFSD)

    
    let price=  +req.params.price
        
    let producdid= req.params.id
    console.log(producdid)
    

cartmodel.addcart(userid,price,producdid).then(()=>{
    res.redirect("/")
}).catch(err=>{
    next(err)
})


}

exports.getcart=(req,res,next)=>{
    

    cartmodel.getcart(req.user._id.toString()).then(data=>{
        res.render('profile', {checklogin : req.isAuthenticated(),cart:req.user.cart[0]
    })
    }).catch(err=>{
        
        next(err)

    })
}
