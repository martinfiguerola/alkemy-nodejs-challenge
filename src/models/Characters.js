const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('Character', {
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    weigth: {
      type: DataTypes.FLOAT
    },
    history: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false })
}