const express = require('express');
const router = express.Router();

const db = require('../../DB/models');
const { Provider, Status, Patient, StatusHistory } = db;

//provider
router.get('/providers', async (req, res) => {
  try {
    const providers = await Provider.findAll();
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//status
router.get('/statuses', async (req, res) => {
  try {
    const statuses = await Status.findAll({
      order: [['order', 'ASC']]
    });
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//patient
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: [
        { model: Provider, as: 'provider' },
        { model: Status, as: 'status' }
      ]
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//status history
router.get('/patients/:id/status-history', async (req, res) => {
  const { id } = req.params;
  try {
    const history = await StatusHistory.findAll({
      where: { patient_id: id },
      include: [
        { model: Status, as: 'status' }
      ],
      order: [['changed_at', 'DESC']]
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
