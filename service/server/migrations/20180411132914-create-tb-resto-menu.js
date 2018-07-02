module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_Resto_Menus', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Name: {
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.DOUBLE
      },
      Description: {
        type: Sequelize.STRING
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
      Type: {
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
    queryInterface.dropTable('Tb_Resto_Menus'),
};