module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_User_Reservation_Uploads', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      BankId: {
        type: Sequelize.STRING
      },
      TransferDt: {
        type: Sequelize.DATE
      },
      SenderName: {
        type: Sequelize.STRING
      },
      Nominal: {
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
      Id_Reserve: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Tb_User_Reservations',
          key: 'Id',
          as: 'Id_Reserve',
        }
      }
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Tb_User_Reservation_Uploads'),
};