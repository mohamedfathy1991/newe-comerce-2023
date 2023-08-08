var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
 require('dotenv').config()

const session= require('express-session')
const flsh =require('connect-flash')
const mongoose=require('mongoose')
const passport =require('passport')
const multer  = require('multer')



var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cartRouter = require("./routes/cart");
var orderRoute = require("./routes/order");

var app = express();


 
 
require('./confic/passport')



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// if (app.get("env") === "development") {
//   app.use(logger("dev"));
// }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(session({
  secret:'asdsads dsadsadsa',
  saveUninitialized:true,
  resave:true,
  
  
}))
app.use(flsh())

app.use(passport.initialize())
app.use(passport.session())

app.use("/cart",cartRouter );
app.use("/products", indexRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/profile", indexRouter);
app.use('/delet',cartRouter)
app.use('/qnt',cartRouter)
app.use('/checkbox',cartRouter)
app.use('/myorder',orderRoute)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404,"page erorr"));
  
});

// error handler
app.use(function (err, req, res, next) {
  
   // set locals, only providing error in development
  res.locals.message = err.message;
   res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error" );
});

module.exports = app;
