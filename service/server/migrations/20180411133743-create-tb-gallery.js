module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_Gallery', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Type: {
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
          model: 'Tb_Resto',
          key: 'Id',
          as: 'Id_Resto',
        }
      }
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Tb_Gallery'),
};