module.exports = (sequelize, DataTypes) => {
  const Tb_Resto = sequelize.define('Tb_Resto', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    PriceFrom: {
      type: DataTypes.DOUBLE,
    },
    PriceEnd: {
      type: DataTypes.DOUBLE,
    },
    Website: {
      type: DataTypes.STRING,
    },
    OpenTime: {
      type: DataTypes.DATE,
    },
    CloseTime: {
      type: DataTypes.DATE,
    },
    OpenDay: {
      type: DataTypes.INTEGER,
    },
    CloseDay: {
      type: DataTypes.INTEGER,
    },
    Address: {
      type: DataTypes.STRING,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })
  Tb_Resto.associate = (models) => {
    Tb_Resto.belongsTo(models.Tb_User, {
      foreignKey: 'Id_User',
      onDelete: 'CASCADE',
    }),
    Tb_Resto.hasMany(models.Tb_Resto_Fac, {
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      sourceKey: 'Id'
    }),
    Tb_Resto.hasMany(models.Tb_Gallery, {
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      sourceKey: 'Id'
    }),
    Tb_Resto.hasMany(models.Tb_Resto_Menu, {
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      sourceKey: 'Id'
    })
  }
  return Tb_Resto
}