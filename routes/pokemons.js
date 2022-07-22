const express = require("express");
const router = express.Router();
const {
  deletePokemons,
  getPokemon,
  getPokemons,
  postPokemons,
  putPokemons,
} = require("../controllers/pokemons");
const { verifyToken } = require("../middlewares/validate-jwt");
router.get("/pokemons", getPokemons);
router.post("/pokemons", verifyToken, postPokemons);
router.get("/pokemons/:id", getPokemon);
router.put("/pokemons/:id", verifyToken, putPokemons);
router.delete("/pokemons/:id", verifyToken, deletePokemons);

module.exports = router;
