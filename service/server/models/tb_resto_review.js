module.exports = (sequelize, DataTypes) => {
  const Tb_Resto_Review = sequelize.define('Tb_Resto_Review', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    comment: DataTypes.STRING,
    rate: DataTypes.DOUBLE,
    userName: DataTypes.STRING,
    userPID: DataTypes.STRING,
    userId: DataTypes.STRING,
    Status: DataTypes.INTEGER

  })
  Tb_Resto_Review.associate = (models) => {
    Tb_Resto_Review.belongsTo(models.Tb_Resto, {
      as: 'Reviews',
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
    })
  }
  return Tb_Resto_Review
}