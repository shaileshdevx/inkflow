const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/Comment');
const Blog = require('../models/blog');
const User = require('../models/User');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner = require('../utils/commentOwner');

// comment route form 

// create comment show form
router.get('/blogs/:id/comments/new', isLoggedIn, (req, res) => {
  res.render('comments_new', {blogId: req.params.id})
});

// create comment

router.post('/blogs/:id/comments/', isLoggedIn, async (req, res) => {
  try{
    const newComment = await Comment.create({
      text: req.body.text,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      blogId: req.body.blogId,
      user: {
        id: req.user._id,
        username: req.user.username,
      }
    })
    req.flash('success', `💬 ${newComment.user.username}, your comment has been added successfully!`)
    res.redirect(`/blogs/${req.body.blogId}`)
  } catch(err) {
    req.flash('error', `❌ we couldn’t post your comment. Please check and retry.`)
  }
});

// comment edit show form

router.get('/blogs/:id/comments/:commentId/edit', checkCommentOwner, async (req, res) => {

  try{
    const blog = await Blog.findById(req.params.id).exec()
    const comment = await Comment.findById(req.params.commentId).exec()
    console.log('Blog', blog)
    console.log('Comment', comment)
    res.render('comment_edit', {blog, comment})
  } catch(err) {
    console.log(err)
  };

});
// comment update
router.put('/blogs/:id/comments/:commentId',checkCommentOwner, async (req, res) => {
  const comment = {
    username: req.body.username,
    text: req.body.text
  }
  try{
    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, comment, {new: true}).exec()
    req.flash('success', '✅ changes saved! Your comment is now updated.')
    res.redirect(`/blogs/${req.params.id}`)
  } catch(err) {
    console.log(err)
  }
})

// comment delete

router.delete('/blogs/:id/comments/:commentId', checkCommentOwner, async (req, res) => {
  try{
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId).exec()
    req.flash('success', '🗑️ your comment has been removed.')
    res.redirect(`/blogs/${req.params.id}`)
  } catch(err) {
    console.log(err)
  }
})


module.exports = router;