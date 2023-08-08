exports.isSinin = (req, res, next) => {
  if (req.isAuthenticated()) {
    //BULT IN IN passport

    next();
  } else {
    return res.redirect("/users/sinin");
  }
};


exports.isnotlogin=(req,res,next)=>{
  if (!req.isAuthenticated()) {
    //BULT IN IN passport

    next();
  } else {
    return res.redirect("/");
  }

}
