var express = require('express');
var router = express.Router();

const productcontrol=require('../control/products')

/* GET home page. */
 router.get('/',productcontrol.getproduct );
// router.post('/',productcontrol.addproduct );



module.exports = router;
