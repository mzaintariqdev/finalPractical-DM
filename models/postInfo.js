const mongoose = require('mongoose');

const PostInfoSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
  },
  clothType: {
    type: mongoose.Schema.Types.ObjectId,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
  },
  price: {
    type: Number,
  },
  titleEn: {
    type: String,
  },
  titleAr: {
    type: String,
  },
  galary: {
    type: Array,
  },
  createdAt: {
    type: Date,
  }
});

const POSTINFO = mongoose.model('posts', PostInfoSchema);

module.exports = POSTINFO;

// database name finalPractical