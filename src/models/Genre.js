const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    }
  }, { timestamps: false })
}