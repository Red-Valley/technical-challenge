'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    provider_id: {
      type: DataTypes.UUID
    },
    status_id: {
      type: DataTypes.UUID
    }
  }, {
    tableName: 'Patients',
    timestamps: true
  });

  Patient.associate = function(models) {
    Patient.belongsTo(models.Provider, {
      foreignKey: 'provider_id',
      as: 'provider'
    });

    Patient.belongsTo(models.Status, {
      foreignKey: 'status_id',
      as: 'status'
    });

    Patient.hasMany(models.StatusHistory, {
      foreignKey: 'patient_id',
      as: 'statusHistories'
    });
  };

  return Patient;
};
