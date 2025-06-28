const mongoose = require('mongoose');

const ClickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  source: String,
  location: String, // (mocked)
});

const ShortUrlSchema = new mongoose.Schema({
  originalUrl: String,
  shortcode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  clicks: [ClickSchema]
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
