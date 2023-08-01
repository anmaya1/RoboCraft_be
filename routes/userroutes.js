const express = require('express');
const router=express.Router();
const {signup,admin,order,verify}=require('../controller/usercontroller')

router.get('/signup',signup);
router.get('/admin',admin);
router.post('/orders',order)
router.post('/verify',verify)

module.exports = router;