const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CallbackRequest = require('./models/CallbackRequest');
const PatientFollowUp = require('./models/PatientFollowUp');
const { pool, initializeMySqlSchema } = require('./db/mysql');
const app = express();
app.use(cors());
app.use(express.json());

const DB_PROVIDER = (process.env.DB_PROVIDER || 'mongo').toLowerCase();

if (DB_PROVIDER === 'mongo') {
  mongoose.connect('mongodb://localhost:27017/medaithon57', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
}

if (DB_PROVIDER === 'mysql') {
  initializeMySqlSchema()
    .then(() => console.log('MySQL connected'))
    .catch((err) => console.error('MySQL connection error:', err));
}

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

    if (DB_PROVIDER === 'mysql') {
      await pool.execute(
        'INSERT INTO callback_requests (name, mobile, otp) VALUES (?, ?, ?)',
        [name, mobile, otp]
      );
    } else {
      const request = new CallbackRequest({ name, mobile, otp });
      await request.save();
    }

    res.status(201).json({ message: 'Callback request submitted!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit request' });
  }
});

// Patient Follow-Up endpoint
app.post('/api/patient-follow-up', async (req, res) => {
  try {
    const { uhid, diagnosis, severity, nextFollowUp } = req.body;

    if (DB_PROVIDER === 'mysql') {
      await pool.execute(
        'INSERT INTO patient_followups (uhid, diagnosis, severity, next_follow_up) VALUES (?, ?, ?, ?)',
        [uhid, diagnosis, severity, nextFollowUp]
      );
    } else {
      const followUp = new PatientFollowUp({ uhid, diagnosis, severity, nextFollowUp });
      await followUp.save();
    }

    res.status(201).json({ message: 'Follow-up submitted for patient UHID ' + uhid });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit follow-up' });
  }
});
// View all callback requests
app.get('/api/request-callbacks', async (req, res) => {
  try {
    let requests;

    if (DB_PROVIDER === 'mysql') {
      const [rows] = await pool.execute(
        'SELECT id, name, mobile, otp, created_at FROM callback_requests ORDER BY created_at DESC'
      );

      requests = rows.map((row) => ({
        id: row.id,
        name: row.name,
        mobile: row.mobile,
        otp: row.otp,
        createdAt: row.created_at,
      }));
    } else {
      requests = await CallbackRequest.find();
    }

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

app.listen(5000, () => console.log('Backend running on port 5000'));