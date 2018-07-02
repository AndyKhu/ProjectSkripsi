module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_Request_AdminRestos', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Email: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      restoName: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.INTEGER
      },
      PID: {
        type: Sequelize.STRING
      },
      Pname: {
        type: Sequelize.STRING
      },
      Ptype: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Tb_Request_AdminRestos'),
};