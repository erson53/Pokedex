import React, { useState, useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import calculateDamage from '../utils/battle';

const BattlePage = () => {
  const { pokemonList } = useContext(PokemonContext);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [isShaking1, setIsShaking1] = useState(false);
  const [isShaking2, setIsShaking2] = useState(false);

  const handleBattle = () => {
    if (pokemon1 && pokemon2) {
      let log = [];
      let hp1 = pokemon1.hp;
      let hp2 = pokemon2.hp;
      let turn = 0;

      const battleStep = () => {
        if (hp1 <= 0 || hp2 <= 0) {
          if (hp1 <= 0) {
            log.push(`${pokemon2.name} wins!`);
          } else {
            log.push(`${pokemon1.name} wins!`);
          }
          setBattleLog([...log]);
          return;
        }

        if (turn % 2 === 0) {
          const damageTo2 = calculateDamage(pokemon1, pokemon2);
          hp2 -= damageTo2;
          log.push(`${pokemon1.name} dealt ${damageTo2} damage to ${pokemon2.name}. ${pokemon2.name} has ${hp2 > 0 ? hp2 : 0} HP left.`);
          setBattleLog([...log]);
          setIsShaking2(true);
          setTimeout(() => {
            setIsShaking2(false);
            turn++;
            battleStep();
          }, 5000);
        } else {
          const damageTo1 = calculateDamage(pokemon2, pokemon1);
          hp1 -= damageTo1;
          log.push(`${pokemon2.name} dealt ${damageTo1} damage to ${pokemon1.name}. ${pokemon1.name} has ${hp1 > 0 ? hp1 : 0} HP left.`);
          setBattleLog([...log]);
          setIsShaking1(true);
          setTimeout(() => {
            setIsShaking1(false);
            turn++;
            battleStep();
          }, 5000);
        }
      };

      battleStep();
    }
  };

  return (
    <div>
      <h2>Battle</h2>
      <div>
        <label>Choose Pokémon 1:</label>
        <select onChange={(e) => setPokemon1(pokemonList.find(p => p.id === parseInt(e.target.value)))}>
          <option value="">Select...</option>
          {pokemonList.map(pokemon => (
            <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>
          ))}
        </select>
        {pokemon1 && (
          <img
            src={pokemon1.imageUrl}
            alt={pokemon1.name}
            className={isShaking1 ? 'shaking' : ''}
          />
        )}
      </div>
      <div>
        <label>Choose Pokémon 2:</label>
        <select onChange={(e) => setPokemon2(pokemonList.find(p => p.id === parseInt(e.target.value)))}>
          <option value="">Select...</option>
          {pokemonList.map(pokemon => (
            <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>
          ))}
        </select>
        {pokemon2 && (
          <img
            src={pokemon2.imageUrl}
            alt={pokemon2.name}
            className={isShaking2 ? 'shaking' : ''}
          />
        )}
      </div>
      <button onClick={handleBattle}>Start Battle</button>
      <div>
        {battleLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default BattlePage;
