const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  publisher: String,
  title: String,
  subTitle: String,
  blogBanner: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
  }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;