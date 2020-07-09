const express = require('express')
const router = express.Router();
const db = require('../models')
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const isLoggedIn = require('../middleware/isLoggedIn');


router.get('', isLoggedIn, (req, res) => {
    db.favorite.findAll({
        where: {
            userId: req.user.dataValues.id
        }
    }).then((favorites) => {
        console.log(favorites)
        favorites = favorites.reverse()
  
        res.render('profile', {favorites})
    }).catch((error) => {
        console.log(error)
    })
})


module.exports = router