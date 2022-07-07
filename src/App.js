import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonSprites, setPokemonSprites] = useState('');

    const getPokemons = async () => {
        try {
            let response = await fetch('https://pokeapi.co/api/v2/pokemon');
            let data = await response.json();
            setPokemons(data.results.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (err) {
            console.error(err);
        }
    };

    const getPokemonSprites = async (name) => {
        if (name === '') return setPokemonSprites('');
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            let data = await response.json();
            setPokemonSprites(data.sprites.front_default);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangePokemon = async (e) => {
        let { value } = e.target;
        setPokemonName(value);
        getPokemonSprites(value);
    };

    useEffect(() => {
        getPokemons();
    }, []);

    return (
        <section id="pokemon">
            <div className="overlay"></div>
            <div className="container">
                <div className="form-group">
                    <select className="form-control" name="pokemons" id="pokemons" onChange={handleChangePokemon}>
                        <option value="">Select Pokemon Name</option>
                        {pokemons?.map((pokemon, index) => (
                            <option value={pokemon.name} key={index}>
                                {pokemon.name}
                            </option>
                        ))}
                    </select>
                </div>
                {pokemonSprites && <img src={pokemonSprites} width="150" alt="pokemon-sprites" />}
                <h3>{pokemonName}</h3>
            </div>
        </section>
    );
};

export default App;
