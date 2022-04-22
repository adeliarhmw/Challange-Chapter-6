"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_game_histories", {
      id_history: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "user_games",
          key: "id_user",
        },
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
      },
      game_tittle: {
        type: Sequelize.TEXT,
      },
      score: {
        type: Sequelize.TEXT,
      },
      level: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_game_histories");
  },
};
