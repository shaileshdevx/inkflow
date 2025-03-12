const Blog = require('../models/blog');

const checkBlogOwner = async (req, res, next) => {
  if(req.isAuthenticated()) {  // check if the user is logged in 
    // if they logged in check if they own the post
  const blog = await Blog.findById(req.params.id).exec()
  // console.log(blog.owner.id);
  // console.log(req.user._id);
  // if owner then render the form to edit
  if(blog.owner.id.equals( req.user._id)) {
    next()
  } else{ //if not redirect back to show page
    res.redirect('back')
  }
  
  } else {  // if not logged in redirect to /login
    res.redirect('/login')
  }
}

module.exports = checkBlogOwner;