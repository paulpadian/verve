
const express = require('express')
const router = express.Router();
const db = require('../models')
//import middleware
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const isLoggedIn = require('../middleware/isLoggedIn');


router.get('', isLoggedIn, (req, res) => {
    console.log('hit profile page')
    res.render('profile')
})

module.exports = router