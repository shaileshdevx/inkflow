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
const config = require('./config');

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
mongoose.connect(config.db.connection, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // // useCreateIndex: true
})
.then(() => console.log('Shaileshdev database connected 😎'))
.catch((error) => console.log('Shaileshdev database connection error 😓', error));

// other config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// express Session config

app.use(expressSession({
  secret: 'oieqwurpoeriopueradfsuyfoew',
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


const port = process.env.PORT || 5000;

// Listen Port
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
