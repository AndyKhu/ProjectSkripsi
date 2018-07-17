module.exports = (sequelize, DataTypes) => {
  const Tb_User_Reservation_Menu = sequelize.define('Tb_User_Reservation_Menu', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Amount: DataTypes.INTEGER,
    MenuId: DataTypes.STRING
  })
  Tb_User_Reservation_Menu.associate = (models) => {
    Tb_User_Reservation_Menu.belongsTo(models.Tb_User_Reservation, {
      as: 'FoodMenu',
      foreignKey: 'Id_Reserve',
      onDelete: 'CASCADE',
    })
  }
  return Tb_User_Reservation_Menu
}