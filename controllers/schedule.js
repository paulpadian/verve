const express = require('express')
const router = express.Router();
const db = require('../models')
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('', isLoggedIn, (req, res) => {
    res.render('schedule')
})


module.exports = router