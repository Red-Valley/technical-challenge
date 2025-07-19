'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parent_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Statuses',
    timestamps: true
  });

  Status.associate = function(models) {
    Status.belongsTo(models.Status, {
      foreignKey: 'parent_id',
      as: 'parent'
    });

    Status.hasMany(models.Status, {
      foreignKey: 'parent_id',
      as: 'children'
    });

    Status.hasMany(models.Patient, {
      foreignKey: 'status_id',
      as: 'patients'
    });

    Status.hasMany(models.StatusHistory, {
      foreignKey: 'status_id',
      as: 'statusHistories'
    });
  };

  return Status;
};
