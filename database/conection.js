const { Pool } = require("pg");
exports.pool = new Pool({
  user: "postgres",
  database: "Pokedex",
  password: "nico123123",
});
