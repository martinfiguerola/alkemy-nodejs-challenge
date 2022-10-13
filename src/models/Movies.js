const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Movie",
    {
      image: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      quallification: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      updatedAt: false,
    }
  );
};
