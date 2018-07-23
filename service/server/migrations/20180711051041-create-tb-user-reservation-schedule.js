module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_User_Reservation_Schedules', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Status: {
        type: Sequelize.INTEGER,
      },
      Id_Reserve: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Tb_User_Reservation',
          key: 'Id',
          as: 'Id_Reserve',
        }
      },
      Id_Seat: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Tb_Resto_Seat',
          key: 'Id',
          as: 'Id_Seat',
        }
      },
      Id_Resto: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Tb_Resto',
          key: 'Id',
          as: 'Id_Resto',
        }
      }
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Tb_User_Reservation_Schedules'),
};