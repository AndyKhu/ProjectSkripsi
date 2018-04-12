module.exports = (sequelize, DataTypes) => {
  const Tb_User_Favorite = sequelize.define('Tb_User_Favorite', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    }
  })
  Tb_User_Favorite.associate = (models) => {
    Tb_User_Favorite.belongsTo(models.Tb_User, {
      foreignKey: 'Id_User',
      onDelete: 'CASCADE',
    })
    Tb_User_Favorite.belongsTo(models.Tb_Resto, {
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
    })
  }

  return Tb_User_Favorite
}
