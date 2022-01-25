const { Sequelize } = require("sequelize");
const sequelize = require("../config/sequlieze");

const tokenTable = sequelize.define(
  "table_token_auth",
  {
    id: {
      field: "id", type: Sequelize.BIGINT, allowNull: false, primaryKey: true,
    },
    name: { field: "name", type: Sequelize.STRING },
    token: { field: "token", type: Sequelize.STRING },
    created_at: { field: "created_at", type: Sequelize.DATE },
    updated_at: { field: "updated_at", type: Sequelize.DATE },
    deleted_at: { field: "deleted_at", type: Sequelize.DATE },

  },
  { tableName: "table_token_auth", timestamps: false },
);

module.exports = tokenTable;
