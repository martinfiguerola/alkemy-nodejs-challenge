const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Character",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      weigth: {
        type: DataTypes.INTEGER,
      },
      history: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
