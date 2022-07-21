const { pool } = require("../database/conection.js");
exports.getPokemons = async (req, res) => {
  const { rows } = await pool.query("select * from public.pokemon");
  res.send(rows);
};
exports.getPokemon = async (req, res) => {
  const { nombre } = req.params;
  const { rows } = await pool.query(
    " SELECT  * FROM public.stats st JOIN pokemon po ON po.pokemonid = st.pokemonid  WHERE st.id =$1",
    [nombre]
  );
  if (rows[0]) {
    res.send(nombre[0]);
  } else {
    res.sendStatus(404);
  }
};
exports.postPokemons = (req, res) => {
  const pokemon = req.body;
  const nuevaLista = Pokemones;
  nuevaLista.push(pokemon);
  return res.send(nuevaLista[nuevaLista.length - 1]);
};

exports.putPokemons = (req, res) => {
  const pokemon = req.body;
  const { id } = req.params;
  const idPokemon = Pokemones.findIndex((p) => p.numero === id);
  if (idPokemon === -1) {
    return res.status(200).json({ mensaje: "No se encontro pokemon" });
  }
  const pokemonAc = { ...Pokemones[idPokemon], ...pokemon };
  Pokemones[idPokemon] = pokemonAc;
  return res.send(Pokemones);
};
exports.deletePokemons = (req, res) => {
  const pokemon = req.body;
  const { id } = req.params;
  const pokemonABorrar = Pokemones.findIndex((p) => p.numero === id);
  Pokemones.splice(pokemonABorrar, 1)[pokemonABorrar] = pokemon;
  return res.send(Pokemones[pokemonABorrar]);
};
function encontrarPorTypes(pokemonesFiltrados, type1) {
  pokemonesFiltrados = pokemonesFiltrados.filter((e) =>
    e.elemento.some((el) => el.toLowerCase() === type1.toLowerCase())
  );
  return pokemonesFiltrados;
}
