const express = require('express');
const router = express.Router();

const db = require('../../DB/models');
const { Provider, Patient, StatusHistory } = db;

//provider
router.put('/providers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Provider.update(req.body, {
      where: { id }
    });

    if (updated) {
      const updatedProvider = await Provider.findByPk(id);
      res.json(updatedProvider);
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//status
router.put('/patients/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status_id } = req.body;

  try {
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    await patient.update({ status_id });

    await StatusHistory.create({
      patient_id: id,
      status_id,
      changed_at: new Date()
    });

    res.json({ message: 'Estado actualizado y registrado en historial' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//patient
router.put('/patients/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Patient.update(req.body, {
      where: { id }
    });

    if (updated) {
      const updatedPatient = await Patient.findByPk(id);
      res.json(updatedPatient);
    } else {
      res.status(404).json({ error: 'Paciente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
