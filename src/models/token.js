const { Sequelize } = require("sequelize");
const sequelize = require("../config/sequlieze");

const userDetail = sequelize.define(
  "table_token_auth",
  {
    id: {
      field: "id", type: Sequelize.BIGINT, allowNull: false, primaryKey: true,
    },
    name: { field: "name", type: Sequelize.STRING },
    token: { field: "last_name", type: Sequelize.STRING },
    created_at: { field: "password", type: Sequelize.DATE },
    updated_at: { field: "password", type: Sequelize.DATE },
    deleted_at: { field: "password", type: Sequelize.DATE },

  },
  { tableName: "table_token_auth", timestamps: false },
);

module.exports = userDetail;
