const express = require('express')
const router = express.Router();
const db = require('../models')
//import middleware
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');


router.get('/', isLoggedIn,  (req, res) => {
    db.blog.findAll({
      order: ['id']
      }).then((blogs) => {
        blogs = blogs.reverse()
        res.render('blog/blog', { blogs })
      }).catch((error) => {
        console.log(error)
      })
})




router.get('/new', isAdmin, (req, res) => {
    res.render('blog/new')
})

router.post('/new', isAdmin, (req, res) => {
    db.blog.create({
        title : req.body.postTitle,
        content: req.body.content,
        authorId: req.user.id
    }).then(data => {
        console.log(data)
        res.redirect('/blog')
    }).catch(err => {
        console.log(err)
    })
})


router.post('/:id', isAdmin, (req, res) => {
  console.log('hit post route 🎯')
  console.log(req.body.id)
  console.log(req.user.dataValues.id)
  db.favorite.findOrCreate({
    where: {
      userId: req.user.dataValues.id,
      blogId: req.body.id,
      blogTitle: req.body.blogTitle,
      date: req.body.blogDate
    }
  }).then(([favorites, created]) => {
        console.log(`${favorites.id} was ${created ? 'created' : 'found'}!`)
        res.redirect(`${req.body.id}`)
  }).catch(err => {
    console.log(err)
  })
});

router.get('/edit', isAdmin, (req, res) => {
  db.blog.findAll({
  }).then(blogs => {
    blogs = blogs.reverse()
    res.render('blog/edit', {blogs})
  }).catch(err => {
    console.log(err, "ERROR!")
  })
    
})

router.post('/delete/:id', isAdmin, (req,res) => {
  console.log(req.params.id)
  db.blog.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    console.log("deleted entry")
    res.redirect('/blog/edit')
  })
})

router.get('/:id', isLoggedIn, (req, res) => {
    db.blog.findOne({
        where: { id : req.params.id },
      })
      .then(blog => {
        if (!blog) throw Error()
        
        res.render('blog/show', { 
          blog: blog
        })
      })
      .catch((error) => {
        console.log(error)
      })
      
})

router.get('/edit/:id', isAdmin, (req, res) => {
  db.blog.findOne({
    where: {id :req.params.id },
  })
  .then(blog => {
    res.render('blog/editOne', {blog})
  })
})

router.post('/edit/:id', isAdmin, (req, res) => {
  console.log(req.body.content)
  console.log(req.body.blogTitle)
  db.blog.update({
    content: req.body.content,
    title: req.body.blogTitle
  }, {
    where: {
      id: req.params.id
    }
  }).then((user) => {
    res.redirect(`/blog/edit/${req.params.id}`)
  });
})



module.exports = router