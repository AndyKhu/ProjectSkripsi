module.exports = (sequelize, DataTypes) => {
  const Tb_User_Reservation_Schedule = sequelize.define('Tb_User_Reservation_Schedule', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Status: {
      type: DataTypes.INTEGER
    }
  })
  Tb_User_Reservation_Schedule.associate = (models) => {
    Tb_User_Reservation_Schedule.belongsTo(models.Tb_User_Reservation, {
      as: 'Reservation',
      foreignKey: 'Id_Reserve'
    })
    Tb_User_Reservation_Schedule.belongsTo(models.Tb_Resto_Seat, {
      as: 'Seats',
      foreignKey: 'Id_Seat'
    })
    Tb_User_Reservation_Schedule.belongsTo(models.Tb_Resto, {
      as: 'Resto',
      foreignKey: 'Id_Resto'
    })
  }
  return Tb_User_Reservation_Schedule
}