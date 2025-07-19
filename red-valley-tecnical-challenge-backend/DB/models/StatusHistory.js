'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusHistory = sequelize.define('StatusHistory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    patient_id: {
      type: DataTypes.UUID
    },
    status_id: {
      type: DataTypes.UUID
    },
    changed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'StatusHistories',
    timestamps: true
  });

  StatusHistory.associate = function(models) {
    StatusHistory.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      as: 'patient'
    });

    StatusHistory.belongsTo(models.Status, {
      foreignKey: 'status_id',
      as: 'status'
    });
  };

  return StatusHistory;
};
