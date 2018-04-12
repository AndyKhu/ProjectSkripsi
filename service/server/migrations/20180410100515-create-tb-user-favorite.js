module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_User_Favorite', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
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
    queryInterface.dropTable('Tb_User_Favorite'),
};
