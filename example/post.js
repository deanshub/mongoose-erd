import mongoose from 'mongoose'

const schema = mongoose.Schema({
  player: {
    type: String,
    ref: 'Player',
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  photos: [{
    type: String,
    required: true,
    default: [],
  }],
  likes: [{
    type: String,
    ref: 'Player',
    required: true,
    default: [],
  }],
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
})

const Post = mongoose.model('Post', schema)
