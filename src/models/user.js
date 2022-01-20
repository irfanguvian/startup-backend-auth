const { Sequelize } = require("sequelize");
const sequelize = require("../config/sequlieze");

const users = sequelize.define(
  "users",
  {
    id: {
      field: "id", type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,
    },
    username: { field: "username", type: Sequelize.STRING },
    email: { field: "email", type: Sequelize.STRING },
    password: { field: "password", type: Sequelize.STRING },
    created_at: { field: "created_at", type: Sequelize.DATE },
    updated_at: { field: "updated_at", type: Sequelize.DATE },
    deleted_at: { field: "deleted_at", type: Sequelize.DATE },

  },
  { tableName: "users", timestamps: false },
);

module.exports = users;
