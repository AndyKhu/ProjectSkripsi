module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_User_Reservations', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Name: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.DOUBLE
      },
      reserveDate: {
        type: Sequelize.DATE
      },
      Duration: {
        type: Sequelize.INTEGER
      },
      totalSeats: {
        type: Sequelize.INTEGER
      },
      Note: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.INTEGER
      },
      RestoId: {
        type: Sequelize.STRING
      },
      Cost: {
        type: Sequelize.DOUBLE
      },
      PID: {
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
    queryInterface.dropTable('Tb_User_Reservations'),
};