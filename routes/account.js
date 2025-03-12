const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');


// signup
router.get('/signup', (req, res) => {
  res.render('signup');
})

// signup create account
router.post('/signup', async (req, res) => {
  try{
    const newUser = await User.register(new User({
      username: req.body.username,
      email: req.body.email
    }), req.body.password);
    passport.authenticate('local')(req, res, () => {
    req.flash('success', `🌟 Welcome to the community, ${newUser.username}! Start sharing your thoughts.`)
      res.redirect('/blogs');
    });
  } catch(err) {
    console.log(err)
  };
});


// login show form

router.get('/login', (req, res) => {
  res.render('login');
});

// login 

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', '✍️ Your voice matters! Write, explore, and inspire others.');
      return res.redirect('/blogs');
    });
  })(req, res, next);
});



// logout

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } 
    req.flash('success', '👋 You have been logged out. See you again soon!');
    res.redirect('/login');
  });
});


module.exports = router;