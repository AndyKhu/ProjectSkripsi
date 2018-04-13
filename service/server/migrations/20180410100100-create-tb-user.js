module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_Users', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Phone: {
        type: Sequelize.STRING
      },
      Type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Age: {
        type: Sequelize.INTEGER
      },
      Weight: {
        type: Sequelize.FLOAT
      },
      Height: {
        type: Sequelize.FLOAT
      },
      EContact: {
        type: Sequelize.STRING
      },
      DpName: {
        type: Sequelize.STRING
      },
      DpType: {
        type: Sequelize.STRING
      },
      DpId: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    queryInterface.dropTable('Tb_Users'),
}
