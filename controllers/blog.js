const express = require('express')
const router = express.Router();
const db = require('../models')
//import middleware
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', (req, res) => {
    res.render('blog/blog')
})

router.get('/new', (req, res) => {
    res.render('blog/new')
})

router.get('/edit', (req, res) => {
    res.render('blog/edit')
})

module.exports = router