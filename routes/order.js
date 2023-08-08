var express = require('express');
var router = express.Router();
const csurf=require('csurf')
const auth=require('../authentication/isauth')


const ordercontrol=require('../control/order')
router.use(csurf());

/* ET home page. */
 router.get('/',auth.isSinin, ordercontrol.getorder );
// router.post('/',productcontrol.addproduct );



module.exports = router;
