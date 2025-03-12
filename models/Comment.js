const mongoose = require('mongoose');
const Blog = require('./blog');

const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
  }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;