module.exports = (sequelize, DataTypes) => {
  const Tb_Resto_Seat = sequelize.define('Tb_Resto_Seat', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    seatFrom: DataTypes.INTEGER,
    seatEnd: DataTypes.INTEGER,
    noSeat: DataTypes.STRING
  })
  Tb_Resto_Seat.associate = (models) => {
    Tb_Resto_Seat.belongsTo(models.Tb_Resto, {
      as: 'Seats',
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      targetKey: 'Id'
    })
  }
  return Tb_Resto_Seat;
};