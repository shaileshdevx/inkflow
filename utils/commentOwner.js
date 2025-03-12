const Comment = require('../models/Comment');


const checkCommentOwner = async (req, res, next) => {
  if(req.isAuthenticated()) {  // check if the user is logged in 
    // if they logged in check if they own the comment
  const comment = await Comment.findById(req.params.commentId).exec()
  // console.log(comment.owner.id);
  // console.log(req.user._id);
  // if owner then render the form to edit
  if(comment.user.id.equals( req.user._id)) {
    next()
  } else{ //if not redirect back to show page
    res.redirect('back')
  }
  
  } else {  // if not logged in redirect to /login
    res.redirect('/login')
  }
}

module.exports = checkCommentOwner;