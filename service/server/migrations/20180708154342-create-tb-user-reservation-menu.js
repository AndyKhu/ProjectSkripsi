module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_User_Reservation_Menus', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Amount: {
        type: Sequelize.INTEGER
      },
      MenuId: {
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
    queryInterface.dropTable('Tb_User_Reservation_Menus'),
};