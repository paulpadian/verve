
const express = require('express')
const router = express.Router();
const db = require('../models')
//import middleware
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const isLoggedIn = require('../middleware/isLoggedIn2');

router.get('/register', isLoggedIn, function(req, res) {
    if(isLoggedIn){
        res.render('auth/register')
    } else {
      res.redirect('/')
    }
    

})


router.get('/login', function(req, res) {
    res.render('auth/login')

})

router.post('/register', isLoggedIn,  (req, res) => {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password,
            admin: req.body.admin,
            bio: req.body.bio
        }
    }).then(function([user, created]) {
        if(created) {
            console.log("User created!");
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Thanks for signing up!'
            })(req, res);
            
        } else {
            console.log("User email already exists.");
            req.flash('error', "Error: email already exists for user. Try again.");
            res.redirect('/auth/register');
        }
    }).catch((err) => {
        console.log(`Error found. Please review - ${err} \n ${err.message}`)
        req.flash('error', err.message);
        res.redirect('/auth/register')
    })
})

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        // if no user authenticated
        if (!user) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/auth/login');
        }
        if (error) {
            return next(error);
        }

        req.login(user, function(error) {
            // if error move to error
            if (error) next(error);
            // if success flash success message
            req.flash('success', 'You are validated and logged in.');
            // if success save session and redirect user
            req.session.save(function() {
                return res.redirect('/profile');
            });
        })
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/')
})

router.get('/delete', isLoggedIn, (req, res) => {
    db.user.findAll({

    })
    .then((users) => {
        console.log(users)
        res.render('auth/delete', {users})
    }) 
    .catch((err) => {
        console.log(err)
    })
})

router.post('/delete/:id', isLoggedIn, (req, res) => {
    db.user.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(user => {
        res.redirect("/auth/delete")
    })
    .catch(error => {
        console.log(error)
    })
})

//export route
module.exports = router