const express = require('express');
const router = express.Router();

const db = require('../../DB/models');
const { Provider, Status, Patient, StatusHistory } = db;

//provider
router.delete('/providers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Provider.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: 'Proveedor eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//status
router.delete('/statuses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Status.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: 'Estado eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//patient
router.delete('/patients/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Patient.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: 'Paciente eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Paciente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//status history
router.delete('/status-history/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await StatusHistory.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: 'Historial eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Historial no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
