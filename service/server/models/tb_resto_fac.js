module.exports = (sequelize, DataTypes) => {
  const Tb_Resto_Fac = sequelize.define('Tb_Resto_Fac', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Name: DataTypes.STRING,
    Icon: DataTypes.STRING
  })
  Tb_Resto_Fac.associate = (models) => {
    Tb_Resto_Fac.belongsTo(models.Tb_Resto, {
      as: 'Facility',
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      targetKey: 'Id'
    })
  }
  return Tb_Resto_Fac;
};