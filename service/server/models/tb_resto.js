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
    ReservePrice: {
      type: DataTypes.DOUBLE,
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
      type: DataTypes.STRING
    },
    Rate: {
      type: DataTypes.DOUBLE
    },
    Status: {
      type: DataTypes.BOOLEAN
    }
  })
  Tb_Resto.associate = (models) => {
    Tb_Resto.belongsTo(models.Tb_User, {
      foreignKey: 'Id_User',
      onDelete: 'CASCADE',
    }),
    Tb_Resto.belongsTo(models.Tb_User_Reservation, {
      as: 'Resto',
      foreignKey: 'Id'
    }),
    Tb_Resto.hasMany(models.Tb_Resto_Fac, {
      as: 'Facility',
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      sourceKey: 'Id'
    }),
    Tb_Resto.hasMany(models.Tb_Resto_Seat, {
      as: 'Seats',
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      sourceKey: 'Id'
    }),
    Tb_Resto.hasMany(models.Tb_Resto_Review, {
      as: 'Reviews',
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      sourceKey: 'Id'
    }),
    Tb_Resto.hasMany(models.Tb_Resto_Account, {
      as: 'Account',
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      sourceKey: 'Id'
    }),
    Tb_Resto.hasMany(models.Tb_Gallery, {
      as: 'Gallery',
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      sourceKey: 'Id'
    }),
    Tb_Resto.hasMany(models.Tb_Resto_Menu, {
      as: 'FoodMenu',
      foreignKey: 'Id_Resto',
      onDelete: 'CASCADE',
      sourceKey: 'Id'
    })
  }
  return Tb_Resto
}