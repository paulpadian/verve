const express = require('express')
const router = express.Router();
const db = require('../models')
//import middleware
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');

router.get('/', isLoggedIn,  (req, res) => {
    res.render('blog/blog')
})

router.get('/new', isAdmin, (req, res) => {
    res.render('blog/new')
})
router.post('/new', isAdmin, (req, res) => {
    db.blog.create({
        title : req.body.postTitle,
        content: req.body.content
    }).then(data => {
        console.log(data)
        res.redirect('/blog')
    }).catch(err => {
        console.log(err)
    })
})

router.get('/edit', isAdmin, (req, res) => {
    res.render('blog/edit')
})

module.exports = router