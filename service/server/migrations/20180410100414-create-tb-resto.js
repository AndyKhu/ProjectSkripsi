module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_Resto', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Phone: {
        type: Sequelize.STRING,
      },
      Description: {
        type: Sequelize.STRING,
      },
      PriceFrom: {
        type: Sequelize.DOUBLE,
      },
      PriceEnd: {
        type: Sequelize.DOUBLE,
      },
      Website: {
        type: Sequelize.STRING,
      },
      OpenTime: {
        type: Sequelize.DATE,
      },
      CloseTime: {
        type: Sequelize.DATE,
      },
      Address: {
        type: Sequelize.STRING,
      },
      Type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      Id_User: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Tb_User',
          key: 'Id',
          as: 'Id_User',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Tb_Resto'),
};