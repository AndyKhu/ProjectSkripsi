module.exports = (sequelize, DataTypes) => {
  const Tb_User_Reservation_Upload = sequelize.define('Tb_User_Reservation_Upload', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    BankId: DataTypes.STRING,
    TransferDt: DataTypes.DATE,
    SenderName: DataTypes.STRING,
    Nominal: DataTypes.DOUBLE,
    PID: DataTypes.STRING
  })  
  Tb_User_Reservation_Upload.associate = (models) => {
    Tb_User_Reservation_Upload.belongsTo(models.Tb_User_Reservation, {
      as: 'Upload',
      foreignKey: 'Id_Reserve',
      onDelete: 'CASCADE',
    })
  }
  return Tb_User_Reservation_Upload
}