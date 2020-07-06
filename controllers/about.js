
const express = require('express')
const router = express.Router();
const db = require('../models')
//import middleware
const flash = require('connect-flash')
const passport = require('../config/ppConfig')



router.get('',  (req, res) => {
    console.log(req.user.admin + "🙁😁😁")
    console.log('hit about page')
    res.render('about')
})

module.exports = router