const mongoose = require('mongoose');

const callbackRequestSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  otp: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CallbackRequest', callbackRequestSchema);