
const ordermodel= require('../model/order')
exports.getorder=(req,res,next)=>{
    console.log(req.user)
    ordermodel.getorder(req.user._id).then(result=>{
        let token= req.csrfToken()
        
     
      let valerr = req.flash("valerr")
      let validationerr= false
      if(valerr.length>0 ){validationerr=true}

        res.render('order',{token:token,person:req.user,order:result,checklogin:true,cart:req.user.cart[0]||null
            ,validationerr:validationerr,valerr:valerr})
    }).catch(err=>{
        console.log(err)
        res.redirect('/')
    })



}