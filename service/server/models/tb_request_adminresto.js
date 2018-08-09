module.exports = (sequelize, DataTypes) => {
  const Tb_Request_AdminResto = sequelize.define('Tb_Request_AdminResto', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Email: DataTypes.STRING,
    fullName: DataTypes.STRING,
    Password: DataTypes.STRING,
    restoName: DataTypes.STRING,
    Status: DataTypes.INTEGER,
    PID: DataTypes.STRING,
    PID2: DataTypes.STRING,
    PID3: DataTypes.STRING,
    Pname: DataTypes.STRING,
    Ptype: DataTypes.STRING
  })
  return Tb_Request_AdminResto;
};