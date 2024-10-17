import React, { useEffect, useState, useCallback } from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

// Component to display list of Pokemon with search and load more functionality
const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [loading, setLoading] = useState(false);

  // Fetch the list of Pokemon from the API
  const fetchPokemons = useCallback(async () => {
    if (!nextUrl) return;
    setLoading(true);

    const response = await fetch(nextUrl);
    const data = await response.json();
    setPokemons(prev => [...prev, ...data.results]);
    setNextUrl(data.next);
    setLoading(false);
  }, [nextUrl]);

  // Fetch initial list of Pokemon when the component mounts
  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  // Filter the Pokemon list based on the search term
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {/* Container for Pokemon cards */}
      <div className="pokemon-container">
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      {/* Load more button */}
      {nextUrl && !loading && (
        <button onClick={fetchPokemons}>Load more</button>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PokemonList;
