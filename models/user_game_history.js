"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user_game, {
        foreignKey: "id_user",
        as: "user_game_history",
      }); //relasi
    }
  }
  user_game_history.init(
    {
      id_history: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      game_tittle: DataTypes.TEXT,
      score: DataTypes.TEXT,
      level: DataTypes.TEXT,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user_game_history",
    }
  );
  return user_game_history;
};
