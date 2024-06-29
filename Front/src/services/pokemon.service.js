// Définition de la fonction fetchPokemonById
const fetchPokemonById = async (pokemonId) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemon = await data.json();
    console.log(pokemon);
    return pokemon;
}

// Exportation par défaut fetchPokemonbyId
export default fetchPokemonById;