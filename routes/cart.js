var express = require('express');
var router = express.Router();


const stripe = require('stripe')('sk_test_51NZhfRKzyoAtD1JuBXSOohuxIGkvwVZABepdQL9nwOQjA0qvjmdb6besE0r0FOhD2MDjGChUOZcyaHrdqssJD2vz00mR5DWIKh')
const auth=require('../authentication/isauth')

const cartcontrol=require('../control/cart')


const cartarray=require('../control/arraycart')

//  router.get('/:price/:id/:name',cartcontrol.addcart)
// router.get('/',cartcontrol.getcart)
router.get('/:price/:id/:name',cartarray.addcart)
router.get('/product/:index',
cartarray.deletproduct)

router.get('/',auth.isSinin,cartarray.getcart)
router.get('/increase/:id',cartarray.increase)
router.get('/decrease/:id',cartarray.decrease)

router.get('/card',auth.isSinin,cartarray.checkcard)
  router.post('/card',auth.isSinin,cartarray.checkout)

 router.get('/decrese',cartarray.decrease)


module.exports = router;
