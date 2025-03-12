

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  } else{
    req.flash('error', '🚀 Hold on ! Sign in to share your thoughts.')
    res.redirect('/login');
  };
};

module.exports = isLoggedIn;