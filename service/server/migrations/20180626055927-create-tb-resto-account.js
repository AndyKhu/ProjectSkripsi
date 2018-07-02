module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_Resto_Accounts', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      BankName: {
        type: Sequelize.STRING
      },
      AccountNumber: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Id_Resto: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Tb_Restos',
          key: 'Id',
          as: 'Id_Resto',
        }
      }
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Tb_Resto_Accounts'),
};