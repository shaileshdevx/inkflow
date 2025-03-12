// Npm imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

// config imports
let config;
try{
  config = require('./config');
} catch(e) {
  console.log("Could not importing config. This probably means you are not working locallly")
  console.log(e)
}

// routes imports
const mainRoute = require('./routes/main');
const blogRoute = require('./routes/blog');
const commentRoute = require('./routes/comment');
const accountRoute = require('./routes/account');

// Model imports
const Blog = require('./models/blog');
const Comment = require('./models/Comment');
const User = require('./models/User');

// mongodb connect

try{
  mongoose.connect(config.db.connection, {

  })
  .then(() => console.log('Shaileshdev database connected 😎'))
  .catch((error) => console.log('Shaileshdev database connection error 😓', error));  
} catch(e) {
  console.log('Could not connect config. This probably means you are not working locally')
  mongoose.connect(process.env.DB_CONNECTION_STRING)
}


// other config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// express Session config

app.use(expressSession({
  secret: process.env.ES_SECRET || config.expressSession.secret,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());


// passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// State config
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.errorMessage = req.flash('error');
  res.locals.successMessage = req.flash('success');
  next()
});

// routes config
app.use(mainRoute);
app.use(blogRoute);
app.use(commentRoute);
app.use(accountRoute);




// Listen Port
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening`);
});
