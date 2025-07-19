'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Providers',
    timestamps: true
  });

  Provider.associate = function(models) {
    Provider.hasMany(models.Patient, {
      foreignKey: 'provider_id',
      as: 'patients'
    });
  };

  return Provider;
};
