const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const Comment = require('../models/Comment');
const User = require('../models/User');
const isLoggedIn = require('../utils/isLoggedIn');
const checkBlogOwner = require('../utils/blogOwner');
const timeAgo = require('../utils/timeAgo');

// Blogs home route
router.get('/blogs',  isLoggedIn, async (req, res) => {
  console.log(req.user)
  try{
    const blogs = await Blog.find().exec()
    const comments = await Comment.find().exec()
    res.render('blog',{blogs, comments});
  } catch(err) {
    console.log(err)
    res.send(err)
  }
});

// create blog form route
router.get('/blogs/new', isLoggedIn, (req, res) => {
  res.render('new_blog',)
})

// create blog route
router.post('/blogs', isLoggedIn, async (req, res) => {
  const newblog = {
    publisher: req.body.publisher,
    title: req.body.title,
    subTitle: req.body.subTitle,
    blogBanner: req.body.blogBanner,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    owner: {
      id: req.user._id,
      username: req.user.username
    }
  }
  try{
    const blog = await Blog.create(newblog)
    req.flash('success', '🔥 You just dropped a masterpiece! What’s next on your mind?')
    res.redirect('/blogs')
  } catch(err) {
    req.flash('error', '❌ Unable to publish! Make sure all fields are filled correctly.')
    res.send(err)
  };
});


// blog show route

router.get('/blogs/:id', isLoggedIn, async (req, res) => {
  try{
    const blog = await Blog.findById(req.params.id).exec()
    const comments = await Comment.find({blogId: req.params.id}).exec()
    res.render('blog_show', {blog, comments, timeAgo})
  } catch(err) {
    console.log(err)
    res.send(err)
  };
});


// blog update route

// blog update show form

router.get('/blogs/:id/edit', checkBlogOwner, async (req, res) => {
  const blog = await Blog.findById(req.params.id).exec()
  res.render('blog_edit', {blog})
});

// blog update actual update DB
router.put('/blogs/:id',  checkBlogOwner, async (req, res) => {
  const blog = {
    publisher: req.body.publisher,
    title: req.body.title,
    subTitle: req.body.subTitle,
    blogBanner: req.body.blogBanner
  }
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true}).exec()
    req.flash('success', '🔥 Edits saved! Your blog is now live with the new updates.')
    res.redirect(`/blogs/${req.params.id}`)
  } catch(err) {
    req.flash('error', '❌ Oops! Something went wrong. Try updating again.')
    res.send(err)
  };
});

// blog delete - duh

router.delete('/blogs/:id', checkBlogOwner, async (req, res) => {
  try{
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id).exec()
    req.flash('success', '📖 One less story! Your blog has been deleted.')
    res.redirect('/blogs')
  } catch(err) {
    req.flash('error', "⚠️ Oops! Something went wrong. Your blog couldn't be deleted.")
    res.send(err)
  };
});

module.exports = router;