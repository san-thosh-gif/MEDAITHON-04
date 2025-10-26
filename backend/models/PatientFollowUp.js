const mongoose = require('mongoose');

const PatientFollowUpSchema = new mongoose.Schema({
  uhid: { type: String, required: true },
  diagnosis: { type: String, required: true },
  severity: { type: String, required: true },
  nextFollowUp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PatientFollowUp', PatientFollowUpSchema);
