//config dotenv
require('dotenv').config();
//require express and setup an express app instance
const Express = require('express')
//require and set view engine using ejs
const ejsLayouts = require('express-ejs-layouts')
//set app to use false urlencoding
//set app public directory for use
// set app ejsLayouts for render
const helmet = require('helmet')
const session = require('express-session')
const flash = require("connect-flash");
const passport = require('./config/ppConfig');
const db = require('./models');
const isLoggedIn = require('./middleware/isLoggedIn');
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sequelize = require('sequelize')
const app = Express();
app.use(sequelize)
app.use(Express.urlencoded( { extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs')
app.use(ejsLayouts);
app.use(require('morgan')('dev'))
app.use(helmet())

// create new instance of class sequelize store
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {

    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;

    next();
})

app.get('/', (req, res) => {
    //check for login
    console.log("you hit me")
    res.render('index');

})

app.use('/about' , require('./controllers/about'))
app.use('/auth' , require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/blog', require('./controllers/blog'))
app.use('/contact', require('./controllers/contact'))
app.use('/schedule', require('./controllers/schedule'))

app.listen(process.env.PORT , () => {
    console.log(`listening on ${process.env.PORT}`)
})