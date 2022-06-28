const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    picture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Picture',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Comment', CommentSchema)
