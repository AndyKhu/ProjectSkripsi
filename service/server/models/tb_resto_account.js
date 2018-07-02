module.exports = (sequelize, DataTypes) => {
  const Tb_Resto_Account = sequelize.define('Tb_Resto_Account', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    BankName: DataTypes.STRING,
    AccountNumber: DataTypes.STRING
  })
  Tb_Resto_Account.associate = (models) => {
    Tb_Resto_Account.belongsTo(models.Tb_Resto, {
      as: 'Account',
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      targetKey: 'Id'
    })
  }
  return Tb_Resto_Account;
};