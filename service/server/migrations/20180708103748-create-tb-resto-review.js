module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tb_Resto_Reviews', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING
      },
      rate: {
        type: Sequelize.DOUBLE
      },
      userPID: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.INTEGER
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
    queryInterface.dropTable('Tb_Resto_Reviews'),
};