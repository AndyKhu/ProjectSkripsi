module.exports = (sequelize, DataTypes) => {
  const Tb_User_Reservation = sequelize.define('Tb_User_Reservation', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Name: DataTypes.STRING,
    Phone: DataTypes.STRING,
    reserveDate: DataTypes.DATE,
    Duration: DataTypes.INTEGER,
    totalSeats: DataTypes.INTEGER,
    Note: DataTypes.STRING,
    Status: DataTypes.INTEGER,
    RestoId: DataTypes.STRING
  })
  Tb_User_Reservation.associate = (models) => {
    Tb_User_Reservation.belongsTo(models.Tb_User, {
      as: 'Reservation',
      foreignKey: 'Id_User',
      onDelete: 'CASCADE',
    })
    Tb_User_Reservation.hasMany(models.Tb_User_Reservation_Menu, {
      as: 'FoodMenu',
      foreignKey: 'Id_Reserve',
      onDelete: 'CASCADE',
      sourceKey: 'Id'
    })
  }
  return Tb_User_Reservation
}