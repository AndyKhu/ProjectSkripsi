module.exports = (sequelize, DataTypes) => {
  const Tb_Gallery = sequelize.define('Tb_Gallery', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Type: DataTypes.STRING,
    PID: DataTypes.STRING,
    Pname: DataTypes.STRING,
    Ptype: DataTypes.STRING
  })
  Tb_Gallery.associate = (models) => {
    Tb_Gallery.belongsTo(models.Tb_Resto, {
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
    })
  }
  return Tb_Gallery;
};