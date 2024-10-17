import React, { useEffect, useState } from 'react';

// Component to display individual Pokemon details
const PokemonCard = ({ pokemon }) => {
  const [pokemonData, setPokemonData] = useState(null);

  // Fetch the detailed data of the specific Pokemon
  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setPokemonData(data);
    };
    fetchPokemonData();
  }, [pokemon.url]);

  // Return null if the data is not yet loaded
  if (!pokemonData) return null;

  // Render the Pokemon card
  return (
    <div className="pokemon-card">
      <img src={pokemonData.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
};

export default PokemonCard;
