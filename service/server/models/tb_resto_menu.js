module.exports = (sequelize, DataTypes) => {
  const Tb_Resto_Menu = sequelize.define('Tb_Resto_Menu', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Name: DataTypes.STRING,
    Price: DataTypes.DOUBLE,
    Description: DataTypes.STRING,
    Type: DataTypes.STRING,
    PID: DataTypes.STRING,
    Pname: DataTypes.STRING,
    Ptype: DataTypes.STRING
  })
  Tb_Resto_Menu.associate = (models) => {
    Tb_Resto_Menu.belongsTo(models.Tb_Resto, {
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
    })
  }
  return Tb_Resto_Menu
}