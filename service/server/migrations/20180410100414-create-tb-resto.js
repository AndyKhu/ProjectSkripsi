module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_Restos', {
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
      ReservePrice: {
        type: Sequelize.DOUBLE,
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
      OpenDay: {
        type: Sequelize.INTEGER,
      },
      CloseDay: {
        type: Sequelize.INTEGER,
      },
      Address: {
        type: Sequelize.STRING,
      },
      Type: {
        type: Sequelize.STRING,
      },
      Rate: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      Status: {
        type: Sequelize.BOOLEAN
      },
      Id_User: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Tb_Users',
          key: 'Id',
          as: 'Id_User',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Tb_Restos'),
};
