module.exports = (sequelize, DataTypes) => {
  const Tb_User = sequelize.define('Tb_User', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Age: {
      type: DataTypes.INTEGER,
    },
    Weight: {
      type: DataTypes.FLOAT,
    },
    Height: {
      type: DataTypes.FLOAT,
    },
    EContact: {
      type: DataTypes.STRING,
    },
    DpName: {
      type: DataTypes.STRING,
    },
    DpType: {
      type: DataTypes.STRING,
    },
    DpId: {
      type: DataTypes.STRING,
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  })
  Tb_User.associate = (models) => {
    Tb_User.hasMany(models.Tb_User_Favorite, {
      foreignKey: 'Id_User',
      as: 'UserFavorite',
    }),
    Tb_User.hasOne(models.Tb_Resto, {
      foreignKey: 'Id_User',
      as: 'userResto',
    })
  }
  return Tb_User
}