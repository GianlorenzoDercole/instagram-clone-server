const mongoose = require('mongoose')

const PictureSchema = new mongoose.Schema(
  {
    cloudId: {
      type: String,
      required: true,
    },
    caption: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Picture', PictureSchema)
