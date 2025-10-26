const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CallbackRequest = require('./models/CallbackRequest');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/medaithon57', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Example endpoint for laundry status
app.get('/api/laundry-status', (req, res) => {
  const { uhid } = req.query;
  const records = { UHID123: 'washed', UHID456: 'unwashed', UHID789: 'washed' };
  res.json({ status: records[uhid] || 'unwashed' });
});

// Callback request endpoint
app.post('/api/request-callback', async (req, res) => {
  try {
    const { name, mobile, otp } = req.body;
    const request = new CallbackRequest({ name, mobile, otp });
    await request.save();
    res.status(201).json({ message: 'Callback request submitted!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit request' });
  }
});

// Patient Follow-Up endpoint
const PatientFollowUp = require('./models/PatientFollowUp');

app.post('/api/patient-follow-up', async (req, res) => {
  try {
    const { uhid, diagnosis, severity, nextFollowUp } = req.body;
    const followUp = new PatientFollowUp({ uhid, diagnosis, severity, nextFollowUp });
    await followUp.save();
    res.status(201).json({ message: 'Follow-up submitted for patient UHID ' + uhid });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit follow-up' });
  }
});
// View all callback requests
app.get('/api/request-callbacks', async (req, res) => {
  try {
    const requests = await CallbackRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

app.listen(5000, () => console.log('Backend running on port 5000'));