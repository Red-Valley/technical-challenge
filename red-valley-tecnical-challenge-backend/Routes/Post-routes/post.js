const express = require('express');
const router = express.Router();

const db = require('../../DB/models');
const { Provider, Status, Patient, StatusHistory } = db;

//provider
router.post('/providers', async (req, res) => {
  try {
    const provider = await Provider.create(req.body);
    res.status(201).json(provider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//status
router.post('/statuses', async (req, res) => {
  try {
    const status = await Status.create(req.body);
    res.status(201).json(status);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//patient
router.post('/patients', async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//status history
router.post('/status-history', async (req, res) => {
  try {
    const statusHistory = await StatusHistory.create(req.body);
    res.status(201).json(statusHistory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
