const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isEmail: { msg: "Agrega un correo valido" },
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        // allowNull defaults to true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // allowNull defaults to true
      },
    },
    { timestamps: false }
  );
};
